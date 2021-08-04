const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");
var { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Why no first name?"],
    },
    lastname: {
      type: String,
      required: [true, "Why no last name?"],
    },
    email: {
      type: String,
      required: [true, "Why no email?"],
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: isEmail,
          message: (props) => `${props.value} is not a valid email !`,
        },
      ],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "park-manager"],
    },
    username: {
      type: String,
      required: [true, "Why no username?"],
      unique: true,
      minlength: [6, "at least 6 characters"],
    },
    password: {
      type: String,
      required: [true, "Why no password?"],
      minlength: [6, "at least 6 characters"],
    },
    birthday: { type: Date, required: [true, "Why no birthday?"], },
    camps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Camp",
      },
    ],
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.models.User || model("User", UserSchema);
module.exports = User;

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

async function createParkManagerAccount() {
  let usernameNotTaken = await validateUsername("Manager");
  if (!usernameNotTaken) {
    return;
  }

  let dob = new Date("2001-05-27");
  // Get the hashed password
  const password = await bcrypt.hash("manager", 12);
  // create park manager account
  const newParkManager = new User({
    firstname: "Admin",
    lastname: "Admin",
    email: "manager@gmail.com",
    username: "Manager",
    password,
    birthday: dob,
    role: "park-manager",
  });

  await newParkManager.save();
}

createParkManagerAccount();

import { validateUser } from "../../pages/api/security/register/validateUser";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../db/models/User");
const { SECRET } = require("../../config");
/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets, role, res) => {
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        signUpMessage: `Username is already taken.`,
        success: false,
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        signUpMessage: `Email is already registered.`,
        success: false,
      });
    }

    // if (userDets.password.length >= 6) {

    // }
    if (userDets.password !== userDets.confirm) {
      return res.status(400).json({
        signUpMessage: `Confirm password does not match`,
        success: false,
      });
    }

    let dob = new Date(userDets.dob);
    if (userDets.password.length >= 6) {
      // Get the hashed password
      const password = await bcrypt.hash(userDets.password, 12);
      // create a new user
      const newUser = new User({
        firstname : userDets.firstname,
        lastname : userDets.lastname,
        email : userDets.email,
        username : userDets.username,
        password,
        birthday : dob, 
        role,
      });

      await newUser.save();
      return res.status(201).json({
        signUpMessage: "Hurry! now you are successfully registred. Please nor login.",
        success: true,
      });   
    } else {
      const newUser = new User({
        ...userDets,
        role,
      });

      await newUser.save();
    }
  } catch (err) {
    const errors = validateUser(err);
    res.status(400).json(errors);
    // Implement logger function (winston)
    // return res.status(500).json({
    //   message: "Unable to create your account.",
    //   success: false
    // });
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;
  console.log(username);
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({
      signInMessage: "Username is not found. Invalid login credentials.",
      success: false,
    });
  }
  // We will check the role
  // if (user.role !== role) {
  //   return res.status(403).json({
  //     message: "Please make sure you are logging in from the right portal.",
  //     success: false
  //   });
  // }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      firstname : user.firstname,
      lastname : user.lastname,
      username: user.username,
      role: user.role,
      email: user.email,
      birthday : user.birthday,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    //  const cookies = new Cookies();
    // cookies.set("jwt", "", { path: "/" });
    // console.log(cookies.get("myCat")); // Pacman

    return res.status(200).json({
      ...result,
      signInMessage: "Hurray! You are now logged in.",
      success: true,
    });
  } else {
    return res.status(403).json({
      signInMessage: "Incorrect password.",
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
};
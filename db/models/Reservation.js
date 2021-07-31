const { Schema, model } = require("mongoose");
var mongoose = require("mongoose");

const ReservationSchema = new Schema(
  {
    startDate: { type: Date, required: [true, "Why no Start Date?"] },
    endDate: { type: Date, required: [true, "Why no End Date?"] },
    unitType: {
      type: String,
      required: [true, "Why no Unit Type?"],
      enum: ["Truck Camper", "Van", "Class A Motor Home", "Class C Motor Home"],
    },
    numOfAdults: {
      type: Number,
      required: [true, "Why no numOfAdults?"],
    },
    numOfChildren: {
      type: Number,
    },
    totalPrice: {
      required: [true, "Why no Total Price?"],
      type: Number,
    },
    fk_camp: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Why no fk_camp?"],
      ref: "Camp",
    },
    fk_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Why no fk_user?"],
      ref: "User",
    },
  },
  { timestamps: true }
);
const Reservation =
  mongoose.models.Reservation || model("Reservation", ReservationSchema);
module.exports = Reservation;

const User = require("../../db/models/User");
const Reservation = require("../../db/models/Reservation");
const Camp = require("../../db/models/Camp");

const reserveCamp = async (reservedCamp, res) => {
  try {
    const userFilter = {
      _id: reservedCamp.fk_user,
    };
    const campFilter = {
      _id: reservedCamp.fk_camp,
    };
    const newReservation = new Reservation(reservedCamp);
    await newReservation.save();
    await User.updateOne(userFilter, {
      $push: { reservations: { $each: [newReservation] } },
    });
    await Camp.updateOne(campFilter, {
      $push: { reservations: { $each: [newReservation] } },
    });
    return res.status(200).json({
      reserveCampMessage: "Hurry! You have successfully reserve a new camp.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      reserveCampMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  reserveCamp,
};

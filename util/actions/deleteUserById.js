const db = require("../../db/models");
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.query;
    await db.User.deleteOne({ _id: id });
    await db.Reservation.deleteMany({fk_user : id})
    return res.status(200).json({
      deletedCampMessage: "You have successfully deleted the camp !!!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      deletedCampMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  deleteUserById,
};

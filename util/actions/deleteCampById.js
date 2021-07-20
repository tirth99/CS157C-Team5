const db = require("../../db/models");
const deleteCampById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    await db.Camp.deleteOne({ _id: id });
    await db.User.findOneAndUpdate(
      { username : 'Manager' },
      { $pull: { camps: { $in: [id] } } }
    );
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
  deleteCampById,
};

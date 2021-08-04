const db = require("../../db/models");

const getAllCamps = async (req, res) => {
  try {
    const allCamps = await db.Camp.find();
    return res.status(200).json({
      camps: allCamps,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      addNewCampMesage: "Error",
      success: false
    });
  }
};

module.exports = {
  getAllCamps,
};

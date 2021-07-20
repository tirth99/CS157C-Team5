const db = require("../../db/models");

const getCampById = async (req, res) => {
  const { id } = req.query;
  try {
    const fetchedCamp = await db.Camp.findOne({ _id: id });
    return res.status(200).json({
      fetchedCamp: fetchedCamp,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      getCampByIdMessage: "Error",
      success: false,
      a,
    });
  }
};

module.exports = {
    getCampById,
};

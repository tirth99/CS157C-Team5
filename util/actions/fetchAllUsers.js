const db = require("../../db/models/index");

const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.find();
    return res.status(200).json({
      allUsers: allUsers,
      message: "Fetched All Users !",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      success: false,
    });
  }
};

module.exports = {
    fetchAllUsers,
};

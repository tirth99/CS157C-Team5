const db = require("../../db/models/index");

const getCurrentUser = async (req, res) => {
  try {
    const username = req.query.username
    const currentUser = await db.User.findOne({ username });
    return res.status(200).json({
      user : currentUser,
        message: "Fetched Current User Successfully !",
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
    getCurrentUser,
};
    
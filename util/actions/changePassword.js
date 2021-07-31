const User = require("../../db/models/User");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  try {
    const filter = { email: req.body.email };
    if (req.body.password === req.body.confirm) {
        const newPassword = await bcrypt.hash(req.body.password, 12);
        await User.updateOne(filter, {
          $set: {
            password : newPassword
          },
        });
        return res.status(200).json({
            changePasswordMessage: "You have successfully changed your password !!!",
            success: true,
    });
    }
    else {
        return res.status(200).json({
            changePasswordMessage: "Confirm password does not match !!!",
            success: false,
    });
    }
    
  } catch (error) {
    return res.status(400).json({
      changePasswordMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  changePassword,
};

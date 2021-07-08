const User = require("../../db/models/User");
/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const updateCurrentUser = async (user, res) => {
  try {
    const filter = { username: user.username };
    const updatedUser = await User.findOne({ username: user.username });
    await User.updateOne(filter, {
      $set: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        birthday: user.birthday,
      },
    });
    const result = {
      username : updatedUser.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday,
      role : updatedUser.role,
    }
    return res.status(200).json({
      ...result,
      updateMessage: "You have successfully updated your profile !!!",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      updateUserMessage: "Error",
      success: false,
    });
  }
};

module.exports = {
  updateCurrentUser,
};

import all from "../../../../middlewares/all";
import nc from "next-connect";
const handler = nc();
handler.use(all);

// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../../../../util/security/Auth");

// Users Protected Route
handler.get(
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);
export default handler;

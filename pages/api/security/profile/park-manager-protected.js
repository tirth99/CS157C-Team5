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

// Super Admin Protected Route
handler.get(
    "/park-manager-protectd",
    userAuth,
    checkRole(["park-manager"]),
    async (req, res) => {
      return res.json("Hello Park Manager");
    }
  );

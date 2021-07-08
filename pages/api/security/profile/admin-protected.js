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

// Admin Protected Route
handler.get(
    "/admin-protectd",
    userAuth,
    checkRole(["admin"]),
    async (req, res) => {
      return res.json("Hello Admin");
    }
  );
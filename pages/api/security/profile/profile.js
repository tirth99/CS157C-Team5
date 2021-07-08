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

// Profile Route
handler.get("/profile", userAuth, async (req, res) => {
    return res.json(serializeUser(req.user));
  });
  

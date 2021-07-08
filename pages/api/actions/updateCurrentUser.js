import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

// Bring in the User Registration function
const {
  updateCurrentUser,
} = require("../../../util/actions/updateCurrentUser");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../../../util/security/Auth");
// userAuth

const handler = nc()
  .use(all)
  .post(userAuth, async (req, res) => {
    await updateCurrentUser(req.body, res);
  });

export default handler;

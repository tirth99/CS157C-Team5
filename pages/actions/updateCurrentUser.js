import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const {
  updateCurrentUser,
} = require("../../../util/actions/updateCurrentUser");

const { userAuth } = require("../../../util/security/Auth");

const handler = nc()
  .use(all)
  .post(userAuth, async (req, res) => {
    await updateCurrentUser(req.body, res);
  });

export default handler;

import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { userLogin } = require("../../../util/security/Auth");

const handler = nc()
  .use(all)
  .post(async (req, res) => {
    await userLogin(req.body, res);
  });

export default handler;

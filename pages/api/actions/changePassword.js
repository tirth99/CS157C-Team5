import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { changePassword } = require("../../../util/actions/changePassword");

const handler = nc()
  .use(all)
  .post(async (req, res) => {
    await changePassword(req, res);
  });

export default handler;

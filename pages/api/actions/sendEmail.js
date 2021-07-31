import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { sendEmail } = require("../../../util/actions/sendEmail");

const handler = nc()
  .use(all)
  .post(async (req, res) => {
    await sendEmail(req, res);
  });

export default handler;

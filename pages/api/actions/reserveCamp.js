import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { reserveCamp } = require("../../../util/actions/reserveCamp");
const { userAuth } = require("../../../util/security/Auth");

const handler = nc()
  .use(all)
  .post(userAuth, async (req, res) => {
    await reserveCamp(req.body, res);
  });

export default handler;

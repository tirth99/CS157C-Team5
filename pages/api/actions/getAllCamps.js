import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { getAllCamps } = require("../../../util/actions/getAllCamps");

const { userAuth } = require("../../../util/security/Auth");

const handler = nc();
handler.use(all);

handler.get(userAuth, async (req, res) => {
  await getAllCamps(req, res);
});

export default handler;

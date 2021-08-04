import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const {
  getAllBookedCamps,
} = require("../../../util/actions/getAllBookedCamps");

const {
  userAuth,
} = require("../../../util/security/Auth");

const handler = nc();
handler.use(all);

handler.get(userAuth, async (req, res) => {
  await getAllBookedCamps(req, res);
});

export default handler;
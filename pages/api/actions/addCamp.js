import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { addCamp } = require("../../../util/actions/addCamp");

const { userAuth, checkRole } = require("../../../util/security/Auth");

const handler = nc();
handler.use(all);

handler.post(userAuth, checkRole(["park-manager"]), async (req, res) => {
  await addCamp(req.body, res);
});

export default handler;

import all from "../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../db/config/dbConnection";

const { fetchAllUsers } = require("../../../util/actions/fetchAllUsers");

const { userAuth, checkRole } = require("../../../util/security/Auth");

const handler = nc();
handler.use(all);

handler.get(userAuth, checkRole(["park-manager"]), async (req, res) => {
  await fetchAllUsers(req, res);
});


export default handler;

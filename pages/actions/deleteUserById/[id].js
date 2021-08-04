import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

const { deleteUserById } = require("../../../../util/actions/deleteUserById");
const { userAuth, checkRole } = require("../../../../util/security/Auth");

const handler = nc()
  .use(all)
  .delete(userAuth, checkRole(["park-manager"]), async (req, res) => {
    await deleteUserById(req, res);
  });

export default handler;

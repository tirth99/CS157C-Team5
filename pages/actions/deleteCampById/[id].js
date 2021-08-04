import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

const { deleteCampById } = require("../../../../util/actions/deleteCampById");
const { userAuth, checkRole } = require("../../../../util/security/Auth");

const handler = nc()
  .use(all)
  .delete(userAuth, checkRole(["park-manager"]), async (req, res) => {
    await deleteCampById(req, res);
  });

export default handler;

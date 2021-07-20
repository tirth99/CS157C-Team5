import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

const { getCampById } = require("../../../../util/actions/getCampById");
const { userAuth } = require("../../../../util/security/Auth");

const handler = nc()
  .use(all)
  .get(userAuth, async (req, res) => {
    await getCampById(req, res);
  });

export default handler;

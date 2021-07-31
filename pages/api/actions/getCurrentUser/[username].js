import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

const { getCurrentUser } = require("../../../../util/actions/getCurrentUser");

const handler = nc()
  .use(all)
  .get(async (req, res) => {
    await getCurrentUser(req, res);
  });

export default handler;

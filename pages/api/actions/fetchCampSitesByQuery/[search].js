import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

const {
  fetchCampSitesByQuery,
} = require("../../../../util/actions/fetchCampSitesByQuery");
const { userAuth } = require("../../../../util/security/Auth");

const handler = nc()
  .use(all)
  .get(userAuth, async (req, res) => {
    await fetchCampSitesByQuery(req, res);
  });

export default handler;

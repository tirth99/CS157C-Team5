import all from "../../../../middlewares/all";
import nc from "next-connect";
import { nosql } from "../../../../db/config/dbConnection";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

const { updateCampById } = require("../../../../util/actions/updateCampById");
const { userAuth, checkRole } = require("../../../../util/security/Auth");

const handler = nc()
  .use(all)
  .put(userAuth, checkRole(["park-manager"]), async (req, res) => {
    await updateCampById(req, res);
  });

export default handler;

import all from '../../../middlewares/all';
import nc from 'next-connect';
import { nosql } from '../../../db/config/dbConnection'

// Bring in the User Registration function
const {
  addCamp
} = require('../../../util/actions/addCamp');

const handler = nc()
   .use(all)
  .post(async (req, res) => {
    await addCamp(req.body, res);
  });

export default handler;
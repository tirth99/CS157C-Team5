import all from '../../../../middlewares/all';
import nc from 'next-connect';
import { nosql } from '../../../../db/config/dbConnection'

// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require('../../../../util/security/Auth');

const handler = nc()
   .use(all)
  .post(async (req, res) => {
    await userRegister(req.body, "user", res);
  });

export default handler;



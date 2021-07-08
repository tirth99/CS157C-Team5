import nc from 'next-connect';
const cors = require("cors");
const passport = require("passport");
const all = nc();

// Middlewares
all.use(cors()).use(passport.initialize())
require("./passport")(passport);

export default all;


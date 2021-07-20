import nc from "next-connect";
const cors = require("cors");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const all = nc();

// Middlewares
all.use(cors()).use(cookieParser()).use(passport.initialize());
require("./passport")(passport);

export default all;

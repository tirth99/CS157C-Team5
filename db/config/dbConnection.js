const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/mydb");

const nosql = mongoose.connection;
nosql.on("error", console.error.bind(console, "connection error:"));
nosql.once("open", function () {
  console.log("Connected");
});

export { nosql };

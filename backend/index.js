const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

app.db = db;

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./config/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(3500, () => {
  console.log("\x1b[32m", "-> Backend em execução!", "\x1b[0m");
});

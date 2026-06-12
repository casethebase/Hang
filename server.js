var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

function startServer() {
  var syncOptions = process.env.DB_SYNC === "true" ? { alter: process.env.DB_SYNC_ALTER === "true" } : null;
  var ready = syncOptions ? db.sequelize.sync(syncOptions) : db.sequelize.authenticate();

  ready.then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  }).catch(function(error) {
    console.error("Unable to initialize database:", error);
    process.exit(1);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;

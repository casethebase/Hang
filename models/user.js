var Sequelize = require("sequelize");
var sequelize = require("..config/connection.js");

var User = sequelize.define("user", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE
});

User.sync();

module.exports = User;
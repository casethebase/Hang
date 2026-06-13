'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env] || {};
var db        = {};
var databaseUrl = process.env.DATABASE_URL || process.env.JAWSDB_URL;

function getDialectOptions(dialect) {
  if (dialect === "postgres" && process.env.DB_SSL !== "false") {
    return {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    };
  }

  return {};
}

function getDialectModule(dialect) {
  if (dialect === "postgres") {
    return require("pg");
  }

  return undefined;
}

function getDialectFromUrl(databaseUrl) {
  if (!databaseUrl) {
    return null;
  }

  if (databaseUrl.indexOf("postgres://") === 0 || databaseUrl.indexOf("postgresql://") === 0) {
    return "postgres";
  }

  return "mysql";
}

if (databaseUrl) {
  var dialect = getDialectFromUrl(databaseUrl);
  var sequelize = new Sequelize(databaseUrl, {
    dialect: dialect,
    dialectModule: getDialectModule(dialect),
    dialectOptions: getDialectOptions(dialect),
    logging: false
  });
} else if (config.use_env_variable && process.env[config.use_env_variable]) {
  var configDialect = config.dialect || "mysql";
  var sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: configDialect,
    dialectModule: getDialectModule(configDialect),
    dialectOptions: getDialectOptions(configDialect),
    logging: false
  });
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    eventName: DataTypes.STRING,
    members: DataTypes.STRING
  }, {});
  Hang.sync({force: false})
  return Hang;
};
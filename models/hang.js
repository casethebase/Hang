module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    eventName: DataTypes.STRING,
    members: DataTypes.STRING
  }, {});
  return Hang;
};
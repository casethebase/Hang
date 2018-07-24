module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    hangName: DataTypes.STRING,
    aboutHang: DataTypes.STRING,
    members: DataTypes.STRING,
    notification: DataTypes.BOOLEAN
  });

  Hang.associate = function(models) {
    Hang.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Hang;
};
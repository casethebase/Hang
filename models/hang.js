module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    hangName: DataTypes.STRING,
    aboutHang: DataTypes.STRING,
    hangDate: DataTypes.STRING,
    hangTime: DataTypes.STRING,
    members: DataTypes.STRING,
    pending_member: DataTypes.STRING,
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

<<<<<<< HEAD

=======
>>>>>>> chris

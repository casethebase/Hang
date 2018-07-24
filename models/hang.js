module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    hangName: DataTypes.STRING,
    aboutHang: DataTypes.STRING,
    hangDate: DataTypes.STRING,
    hangTime: DataTypes.STRING,
    creatorId: DataTypes.STRING,
    members: DataTypes.STRING,
    pending_members: DataTypes.STRING,
  }, {});

  Hang.sync({force: true})
  return Hang;
};


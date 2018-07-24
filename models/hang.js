module.exports = function(sequelize, DataTypes) {
  var Hang = sequelize.define('Hang', {
    hangName: DataTypes.STRING,
    aboutHang: DataTypes.STRING,
    creatorId: DataTypes.STRING,
    members: DataTypes.STRING,
    notification: DataTypes.BOOLEAN
  },{
    classMethods: {
      associate: function(models){
        Hang.belongsTo(models.User, {
          onDelete: "cascade",
          foreignKey:{
            allowNull: false
          }
        })
      }
    }
  });
  Hang.sync({force: true})
  return Hang;
};
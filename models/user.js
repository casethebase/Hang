module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    userFirstName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });


  return Users;
};
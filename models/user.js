module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
  var Users = sequelize.define('Users', {
    userFirstName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });


  return Users;
};
=======
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        created_at: DataTypes.DATE
    });
    return User;
    };
>>>>>>> ac2433d65d5097811d91cc9452e18996e91cd42e

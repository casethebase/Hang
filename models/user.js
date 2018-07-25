module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        notification: DataTypes.BOOLEAN
    });

<<<<<<< HEAD

    User.sync({force: true})
=======
    User.associate = function(models) {
        User.hasMany(models.Hang, {
          onDelete: "cascade"
        });
      };
>>>>>>> em
    return User;

    };


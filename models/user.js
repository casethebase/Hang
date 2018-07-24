module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models){
                User.hasmany(models.Hang);
            }
        }

    });
    

    User.sync({force: true})
    return User;

    };


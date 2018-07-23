module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });
    // User.associate = function(models){
    //     User.hasMany(models.Hang, {
    //         onDelete: "cascade"
    //     });
    // }

    // User.sync({force: true})
    return User;

    };


module.exports = function(sequelize, DataTypes) {
    var Calendar = sequelize.define("Calendar", {
        eventTitle: DataTypes.STRING,
        dateStart: DataTypes.STRING,
        dateEnd: DataTypes.STRING,
        timeStart: DataTypes.STRING,
        timeEnd: DataTypes.STRING,
        userID: DataTypes.STRING
    });
    Calendar.sync({force: false})
    return Calendar;

    };


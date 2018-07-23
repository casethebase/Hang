module.exports = function(sequelize, DataTypes) {
    var Calendar = sequelize.define("Calendar", {
        eventName: DataTypes.STRING,
        date: DataTypes.STRING,
        timeStart: DataTypes.STRING,
        timeEnd: DataTypes.STRING,
        userId: DataTypes.STRING
    });
    Calendar.sync({force: false})
    return Calendar;

    };


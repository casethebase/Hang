module.exports = function(sequelize, DataTypes)  {
var Event = sequelize.define("Event", {
    eventName: DataTypes.STRING,
    eventDate: DataTypes.STRING,
    participant: DataTypes.STRING
});
return Event;
};
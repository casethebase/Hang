var db = require("../models")

module.exports = function(app) {
    app.get("/", function(req, res){
        db.user.findAll({}).then(function(dbUsers){
            res.json(dbUsers)
        })
    })
}
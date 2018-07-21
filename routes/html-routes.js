var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        
        db.User.findAll({}).then(function(dbUsers){
            console.log(dbUsers);
            res.render("index");
            // console.log(hbObject)
            
        })
    });

    app.get("/hangs", function(req, res) {
        
        db.User.findAll({}).then(function(dbUsers){
            console.log(dbUsers);
            res.render("index", dbUsers);
            // console.log(hbObject)
            
        })
    });
}


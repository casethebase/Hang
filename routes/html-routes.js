var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("index")
        
    });
    app.get("/index", function(req, res) {
        res.render("index")
        
    });

    app.get("/login", function(req, res) {
        res.render("login");
    });
   
    app.get("/signUp", function(req, res) {
        res.render("signUp");
    });

    app.get("/hangs", function(req, res) {
        
        db.User.findAll({}).then(function(dbUsers){
            console.log(dbUsers);
            res.render("index", dbUsers);
            // console.log(hbObject)
            
        })
    });
}


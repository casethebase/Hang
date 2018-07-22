var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.redirect("/login");
    });

    // app.get("/index", function(req, res) {
    //     res.render("index")
        
    // });


    app.get("/dashboard/:userId", function(req,res){
        var userId = req.params.userId;
        db.Hang.findAll({where:{creatorId:userId}}).then(function(dbHangs){
            res.render("index", {hangs:dbHangs});
        })
    });

    app.get("/login", function(req, res) {
        res.render("login");
    });
   
    app.get("/signUp", function(req, res) {
        res.render("signUp");
    });

}


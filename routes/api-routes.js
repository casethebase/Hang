var db = require("../models");


module.exports = function(app) {

    app.post("/api/signup", function(req, res) {
        var user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
    
        }
        console.log(req.body);
        db.User.create(user).then(function(dbUser){
            res.json(dbUser)
        })
    
    });

    app.post("/api/login", function(req, res) {
        db.User.findOne({
            where: req.body
        }).then(function(dbUser){
            if(dbUser){
                res.status(200).json(dbUser) 
            }else{
                res.status(404).send("404")
            }
        })
    
    });

    app.get("/api/user/:id", function(req,res){
        var id = req.params.id;
        db.User.findOne({where:{id:id}}).then(function(dbUser){
            res.status(200).json(dbUser)
        })
    });

    app.get("/api/hangs/:id", function(req,res){
        var userId = req.params.id;
        //todo: get all hangs related to the user
    });

    //this is just for testing
    app.get("/api/users", function(req, res) {

        db.User.findAll({}).then(function(dbUsers){
            res.json(dbUsers);
        })
    });


}





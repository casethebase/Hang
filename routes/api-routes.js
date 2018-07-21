var db = require("../models");


module.exports = function(app) {

    app.post('/api/signup', function(req, res) {
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


}





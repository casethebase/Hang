var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {

    });
}


// app.post('/signup', function(req, res) {
//     const user = models.user.build({
//         name: req.body.name,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//     })
    
//     console.log(req.body);

//     user.save().then(function(user) {
//         req.username = user.username;
//         req.session.authenticated = true;
//         res.redirect('/login')
//         console.log(req.session);
//     })
// });


var db = require("../models");
var moment = require("moment");

function timeCoversion(hangs) {
    var hangsArray = [];
    if (hangs.length > 0) {
      for(i = 0; i < hangs.length; i++) {
        var hang = hangs[i];
        var date = moment(hang.hangDate).format("LL");
        var time = moment.unix(hang.hangTime).format("LT");

        console.log("RAW ONE")
        console.log(hang.hangTime)
        hang.hangDate = date;
        hang.hangTime = time;
        hangsArray.push(hangs[i]);
      };
    };
    return hangsArray;
  };


module.exports = function(app) {

    app.get("/", function(req, res) {
        res.redirect("/login");
    });

    // app.get("/index", function(req, res) {
    //     res.render("index")
        
    // });


    app.get("/dashboard/:userId", function(req,res){
        var userId = req.params.userId;
        db.Hang.findAll({where:{UserId:userId}}).then(function(dbHangs){
            res.render("index", {hangs:timeCoversion(dbHangs)});
        })
    });

    app.get("/login", function(req, res) {
        res.render("login");
    });
   
    app.get("/signUp", function(req, res) {
        res.render("signUp");
    });

    app.get("/calendar", function(req, res) {
        res.render("calendar");
    });

}


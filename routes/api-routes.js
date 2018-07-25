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

    app.post("/api/hangs", function(req,res){
        var newHang = req.body;
        db.Hang.create(newHang).then(function(dbHang){
            res.json(dbHang)
            console.log(dbHang);
            db.User.findOne({where: {email: dbHang.pending_member}}).then(function(dbUser){
                var recipient = dbUser.id;
                
                db.Calendar.findAll({where:{userId: recipient}}).then(function(res){
                    for(var i = 0; i < res.length; i++){
                        if (res[i].date === dbHang.hangDate){
                        console.log("Yes");
                        var recipientStartTime = res[i].timeStart;
                        var recipientEndTime = res[i].timeEnd;
                            if(recipientStartTime < dbHang.hangTime < recipientEndTime){
                                console.log("heck no");
                                db.User.update({notification: true}, 
                                    {where: {id: recipient}})
                            }
                            else {
                                console.log("hell yeah");
                                db.User.update({notification: true});
                                //change notification to 1 on recipient's table
                            }
                        
                        }
                        else {
                            console.log("nope");
                        }
                    }

                    
                })
            })
        })
    });

    // app.post("/api/hangs", function(req,res){
    //     var hangTime = req.body.hangTime;
    //     var hangDay = req.body.hangDate;
   
    // });

    app.post("/api/event", function(req,res){
        var newEvent = req.body;
        db.Calendar.create(newEvent).then(function(dbCalendar){
            res.json(dbCalendar);
        })
    });

    app.get("/api/user/:id", function(req,res){
        var id = req.params.id;
        db.User.findOne({where:{id:id}}).then(function(dbUser){
            res.status(200).json(dbUser)
        })
    });

    

    //this is just for testing
    app.get("/api/users", function(req, res) {

        db.User.findAll({}).then(function(dbUsers){
            res.json(dbUsers);
        })
    });


}





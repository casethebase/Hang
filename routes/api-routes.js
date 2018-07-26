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
        //this is the hang object the user just created
        var newHang = req.body;
        //add the new hang to the Hang table
        db.Hang.create(newHang).then(function(dbHang){
            res.json(dbHang)
            console.log(dbHang);
            //look through the user table for any email addresses that match the person we're inviting (pending_member from hang object)
            db.User.findOne({where: {email: dbHang.pending_member}}).then(function(dbUser){
                //if found, take the id associated with that user and bind it to recipient
                var recipient = dbUser.id;
                //grab all events from the Calendar table that were created by recipient
                db.Calendar.findAll({where:{userId: recipient}}).then(function(res){
                    //update this counter each time an event has a conflict. if no conflicts after looping through each event, then success
                    var conflicts = 0;
                    //cycle through each event
                    for(var i = 0; i < res.length; i++){
                        //if the date of the hang matches the event date from the calendar table, then apply more conditions to check the times
                        if (res[i].date === dbHang.hangDate){
                            //bind the value of the calendar event start time to recipientStarttime and convert it to a number
                            var recipientStartTime = parseInt(res[i].timeStart);
                            //bind the value of the calendar event end time to recipientEndTime and convert it to a number
                            var recipientEndTime = parseInt(res[i].timeEnd);
                            //if the hang start time falls between the calendar event's start and end time, then they are not available for the hang
                            if(recipientStartTime < dbHang.hangTime < recipientEndTime){
                                console.log("No, they already have something during that timeframe. + 1 to conflicts");
                                conflicts = conflicts + 1;
                                console.log(conflicts);
                            }
                        }
                    }
                    if(conflicts === 0) {
                        //change notification to 1 on recipient's table because there are no conflicts after going through every event
                        console.log("All Clear for hangin!")
                        db.User.update({notification: true}, 
                            {where: {id: recipient}})
                    }

                    
                })
            })
        })
    });


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





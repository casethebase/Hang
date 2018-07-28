var db = require("../models");
var moment = require('moment');
var eventsArray= [];
function convertEventsFromTable(events) {
    var eventObject = {}
    if (events.length > 0) {
      for(i = 0; i < events.length; i++) {
        var event = events[i];
        var name = event.eventName;
        var rawDate = event.date;
        var rawTimeStart = moment.unix(event.timeStart);
        var rawTimeEnd = moment.unix(event.timeEnd);
        var date = moment(rawDate).format("YYYY-MM-DD");
        var timeStart = moment(rawTimeStart).format("HH:mm:ss");
        var timeEnd = moment(rawTimeEnd).format("HH:mm:ss");
        var start = date + "T" + timeStart;
        var end = date + "T" + timeEnd;
        eventObject = {
          title: name,
          start: start,
          end: end,
        };
      };
      eventsArray.push(eventObject);
    };
    console.log("HERE!!")
    console.log(eventsArray)
  };


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
        
         //update this counter each time an event has a conflict. if no conflicts after looping through each event, then success
         var conflicts = 0;
         //this is the hang object the user just created
        var newHang = req.body;
        //add the new hang to the Hang table
        
            // console.log(dbHang);
            //look through the user table for any email addresses that match the person we're inviting (pending_member from hang object)
            db.User.findOne({where: {email: newHang.pending_member}}).then(function(dbUser){
                //if found, take the id associated with that user and bind it to recipient
                var recipient = dbUser.id;
                //grab all events from the Calendar table that were created by recipient
                db.Calendar.findAll({where:{userId: recipient}}).then(function(res){
                   
                    //cycle through each event
                    for(var i = 0; i < res.length; i++){
                        //if the date of the hang matches the event date from the calendar table, then apply more conditions to check the times
                        if (res[i].date ===  newHang.hangDate){
                            //bind the value of the calendar event start time to recipientStarttime and convert it to a number
                            var recipientStartTime = parseInt(res[i].timeStart);
                            //bind the value of the calendar event end time to recipientEndTime and convert it to a number
                            var recipientEndTime = parseInt(res[i].timeEnd);
                            //if the hang start time falls between the calendar event's start and end time, then they are not available for the hang
                            if(recipientStartTime < newHang.hangTime < recipientEndTime){
                                console.log("No, they already have something during that timeframe. + 1 to conflicts");
                                conflicts = conflicts + 1;

                            }
                        }
                    }
                    if(conflicts === 0) {
                        //change notification to 1 on recipient's table because there are no conflicts after going through every event
                        console.log("All Clear for hangin!")
                        db.Hang.create(newHang).then(function(){
                            db.User.update({notification: true}, 
                                {where: {id: recipient}})
                        })
                    }
                    
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


    app.get("/api/calendar/:id", function(req, res) {
        
        var userID = req.params.id;
        db.Calendar.findAll({where:{userId: userID}}).then(function(dbCalendar){
        if(dbCalendar) {
            convertEventsFromTable(dbCalendar);
            res.status(200).json(eventsArray);
           
        } else {
            res.status(404).send("404")
        }
        });
    });

     //looks for any pending hangs that match our user's email address
     app.get("/api/pendingHang/:id", function(req, res) {
        console.log("starting the pendingHang API route");
        var userId = req.params.id;
        db.User.findOne({where: {id:userId}}).then(function(dbUser){
            var email = dbUser.email;
            console.log("Here is the user's email: " + email);
            if(dbUser.notification === true) {
                db.Hang.findAll({where: 
                    {pending_member: email}
                }).then(function(hangInvite){
                    res.json(hangInvite);
                    var testHang = JSON.stringify(hangInvite);
                    console.log("Here is the user's pending hang info: " + testHang);
                })
            }
        })
    });

    //once user accepts invite, this route will remove them from the pending_member field and add them to the member field.
    app.put("/api/pendingHang/:id:email", function(req, res) {
        db.Hang.update({
            pending_member: "",
            members: req.params.email
        },{
          where: {
            id: req.params.id,
            
          }
        }).then(function(dbHang) {
            var test = JSON.stringify(dbHang);
            console.log("WHAT IS THIS? ==================" + test);
          res.json(dbHang);
        });
    
      });


}





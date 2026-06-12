var db = require("../models");
var moment = require("moment");

function convertEventsFromTable(events) {
  return events.map(function(event) {
    var date = moment(event.date).format("YYYY-MM-DD");
    var timeStart = moment.unix(event.timeStart).format("HH:mm:ss");
    var timeEnd = moment.unix(event.timeEnd).format("HH:mm:ss");

    return {
      title: event.eventName,
      start: date + "T" + timeStart,
      end: date + "T" + timeEnd
    };
  });
}

function hangConflictsWithEvent(hang, event) {
  if (event.date !== hang.hangDate) {
    return false;
  }

  var hangTime = parseInt(hang.hangTime, 10);
  var eventStartTime = parseInt(event.timeStart, 10);
  var eventEndTime = parseInt(event.timeEnd, 10);

  return eventStartTime <= hangTime && hangTime <= eventEndTime;
}

module.exports = function(app) {
  app.post("/api/signup", function(req, res) {
    var user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    db.User.create(user)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(error) {
        res.status(400).json({ error: error.message });
      });
  });

  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
      .then(function(dbUser) {
        if (!dbUser) {
          return res.status(404).send("404");
        }

        res.status(200).json(dbUser);
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.post("/api/hangs", function(req, res) {
    var newHang = req.body;

    db.User.findOne({ where: { email: newHang.pending_member } })
      .then(function(dbUser) {
        if (!dbUser) {
          return res.status(404).json({ error: "Recipient not found" });
        }

        return db.Calendar.findAll({ where: { userId: dbUser.id } })
          .then(function(events) {
            var hasConflict = events.some(function(event) {
              return hangConflictsWithEvent(newHang, event);
            });

            if (hasConflict) {
              return res.status(409).json({ error: "Recipient has a scheduling conflict" });
            }

            return db.Hang.create(newHang).then(function(dbHang) {
              return db.User.update(
                { notification: true },
                { where: { id: dbUser.id } }
              ).then(function() {
                res.status(201).json(dbHang);
              });
            });
          });
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.post("/api/event", function(req, res) {
    db.Calendar.create(req.body)
      .then(function(dbCalendar) {
        res.json(dbCalendar);
      })
      .catch(function(error) {
        res.status(400).json({ error: error.message });
      });
  });

  app.get("/api/user/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } })
      .then(function(dbUser) {
        if (!dbUser) {
          return res.status(404).send("404");
        }

        res.status(200).json(dbUser);
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll({})
      .then(function(dbUsers) {
        res.json(dbUsers);
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.get("/api/calendar/:id", function(req, res) {
    db.Calendar.findAll({ where: { userId: req.params.id } })
      .then(function(dbCalendar) {
        res.status(200).json(convertEventsFromTable(dbCalendar));
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.get("/api/pendingHang/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } })
      .then(function(dbUser) {
        if (!dbUser) {
          return res.status(404).send("404");
        }

        if (!dbUser.notification) {
          return res.json([]);
        }

        return db.Hang.findAll({
          where: { pending_member: dbUser.email }
        }).then(function(hangInvite) {
          res.json(hangInvite);
        });
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });

  app.put("/api/pendingHang/:id/:email", function(req, res) {
    db.Hang.update({
      pending_member: "",
      members: req.params.email
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(function(dbHang) {
        res.json(dbHang);
      })
      .catch(function(error) {
        res.status(500).json({ error: error.message });
      });
  });
};

const express = require("express");
const mongoose = require("mongoose");
const hash = require("./Auth");

mongoose.connect("mongodb://localhost/events", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to DB");
});

const User = require("./Schemas/UserSchema");
const EventParticipation = require("./Schemas/EventParticipationSchema");
const Event = require("./Schemas/EventSchema");

var router = express.Router();

router.post("/create-user", (req, res) => {
    const user = new User(req.body);
    user.password = hash(user.password);

    User.findOne({ username: user.username }, (err, result) => {
        if (result) {
            res.status(409).send("Username already exists");
            return console.error("Username already exists");
        }
        user.save((err, user) => {
            if (err) return console.error(err);
            console.log(`-----\nA new user was created in the DB!\n${user}!\n-----`);
            res.send(JSON.stringify("New user created"));
        });
    });
});

router.post("/login-user", (req, res) => {
    User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No user found");
            return console.error("No user found");
        }

        if (hash(req.body.password) === result.password) {
            req.session.authenticated = true;
            console.log(`-----\nUser "${req.body.username}" successfully logged in!\n-----`);
            res.send(JSON.stringify("Success!"));
        }
    });
});

router.post("/create-event", (req, res) => {
    const event = new Event(req.body);
    event.save((err, event) => {
        if (err) return console.error(err);
        console.log(`-----\nA new event was added to the DB!\n${event}\n-----`);
        res.send(req.status);
    });
});

router.get("/register-for-event", (req, res) => {
    Event.find({}, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found");
            return console.error("No events found");
        }

        res.send(result);
    });
});

router.post("/register-for-event", (req, res) => {
    const eventParticipation = new EventParticipation(req.body);
    EventParticipation.exists({ currentUser: req.body.currentUser, eventId: req.body.eventId }, (err, doc) => {
        if (err) return console.log(err)
        if (!doc) {
            eventParticipation.save((err, event) => {
                if (err) return console.error(err);
                console.log(`-----\nA new event participation was added to the DB!\n${event}\n-----`);
                res.send(req.status);
            });
        } else {
            res.status(201).send("Already exists.");
        }
    })
});

router.delete("/register-for-event", (req, res) => {
    Event.findByIdAndDelete(req.body._id, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found");
            return console.error("No events found");
        } else if (req.body.host === result.host) {
            console.log(`-----\nUser ${req.body.username} deleted an event with ID: ${req.body._id}\n-----`);
            EventParticipation.deleteMany({eventId: req.body._id}, (err, result) => {
                if (err) return console.log(err);
                res.send(result);
            });
        } else {
            console.log("Deleted an event from a different user?");
        }
    });
});

router.get("/overview", (req, res) => {
    EventParticipation.find({}, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found.");
            return console.error("No events found.");
        }

        res.send(result);
    });
});

router.delete("/overview", (req, res) => {
    EventParticipation.findByIdAndDelete(req.body.eventId, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found");
            return console.error("No events found");
        } else if (req.body.username === result.user) {
            console.log(`-----\nUser ${req.body.username} deleted an event participation with ID: ${req.body.eventId}\n-----`);
            res.send(result);
        } else {
            console.log("Deleted an event from a different user?");
        }

    });
});

module.exports = router;
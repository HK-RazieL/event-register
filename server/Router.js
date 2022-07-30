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
const Event = require("./Schemas/EventSchema");

var router = express.Router();

router.post("/create-user", (req, res) => {
    const user = new User(req.body);
    user.password = hash(user.password);

    User.findOne({username: user.username}, (err, result) => {
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
    User.findOne({username: req.body.username}, (err, result) => {
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

router.post("/register-for-event", (req, res) => {
    const event = new Event(req.body);
    event.save((err, event) => {
        if (err) return console.error(err);
        console.log(`-----\nA new event was added to the DB!\n${event}\n-----`);
        res.send(req.status);
    });
});

router.get("/overview", (req, res) => {
    Event.find({}, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found");
            return console.error("No events found");
        }

        res.send(result);
    });
});

router.delete("/overview", (req, res) => {
    Event.findByIdAndDelete(req.body.eventId, (err, result) => {
        if (err) return console.error(err);

        if (!result) {
            res.status(404).send("No events found");
            return console.error("No events found");
        } else if (req.body.username === result.user) {
            console.log(`-----\nUser ${req.body.username} deleted an event with ID: ${req.body.eventId}\n-----`);
            res.send(result);
        } else {
            console.log("Deleted an event from a different user?");
        }

    });
});

module.exports = router;
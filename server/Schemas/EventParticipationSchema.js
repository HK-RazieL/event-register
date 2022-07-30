const mongoose = require("mongoose");

const eventParticipationSchema = new mongoose.Schema({
    currentUser: String,
    eventId: String,
    eventName: String,
    description: String,
    date: Date,
});

module.exports = mongoose.model("EventParticipation", eventParticipationSchema);
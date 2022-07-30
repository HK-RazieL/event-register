const mongoose = require("mongoose");

const eventParticipationSchema = new mongoose.Schema({
    user: String,
    event: String,
    description: String,
    date: Date,
});

module.exports = mongoose.model("EventParticipation", eventParticipationSchema);
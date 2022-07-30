const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    host: String,
    eventName: String,
    description: String,
    date: Date,
});

module.exports = mongoose.model("Event", eventSchema);
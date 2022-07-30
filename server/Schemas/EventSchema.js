const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    user: String,
    event: String,
    description: String,
    date: Date,
});

module.exports = mongoose.model("Event", eventSchema);
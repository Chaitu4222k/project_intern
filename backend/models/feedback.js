const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    internName: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;

const mongoose = require("mongoose");
const performanceSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Intern",
        required: true
    },
    evaluation: {
        type: String,
        required: true
    },
    performanceDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Performance = mongoose.model("Performance", performanceSchema);
module.exports = Performance;

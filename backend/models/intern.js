const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter intern's name"],
        trim: true
    },
    contact: {
        type: String,
        required: [true, "Please enter contact information"]
    },
    department: {
        type: String,
        required: [true, "Please enter department"]
    },
    startDate: {
        type: Date,
        required: [true, "Please enter start date"]
    },
    endDate: {
        type: Date,
        required: [true, "Please enter end date"]
    },
}, {
    timestamps: true
});

const Intern = mongoose.model("Intern", internSchema);
module.exports = Intern;

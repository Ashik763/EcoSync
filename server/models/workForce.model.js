const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const workForceSchema = new Schema({
    employeeID: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    dateOfHire: {
        type: Date,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    paymentRatePerHour: {
        type: Number,
        required: true
    },
    contactInformation: {
        type: String,
        required: true
    },
    assignedCollectionRoute: { // Ward Number hobe
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("work_force", workForceSchema);

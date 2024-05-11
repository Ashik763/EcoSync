const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const monitoringWasteSchema = new Schema({
    timeOfArrival: {
        type: Date,
        required: true
    },
    amountOfWaste: {
        type: Number,
        required: true
    },
    contractorId: {
        type: Number,
        required: true
    },
    designatedStsWardNo: {
        type: Number,
        required: true
    },
    vehicleNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("monitoringWastage", monitoringWasteSchema);

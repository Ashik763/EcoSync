// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const monitoringWorkingHourSchema = mongoose.Schema({


    employeeID: {
        type: Number,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },

  
});

module.exports = mongoose.model("monitoring_working_hour", monitoringWorkingHourSchema);

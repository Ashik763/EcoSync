const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const billingByStsSchema = mongoose.Schema({
    weightOfWasteCollected: {
        type: Number,
        required: true
    },
    requiredWaste: {
        type: Number,
        required: true
    },
    paymentPerTonnage: {
        type: Number,
        required: true
    },
    fineRateForEachTon: {
        type: Number,
        required: true
    },
    totalBill:{
        type: Number,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model("billingBySts", billingByStsSchema);

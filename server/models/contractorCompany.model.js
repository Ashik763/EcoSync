const mongoose = require("mongoose");


const ContractorCompanySchema =  mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    contractID: {
        type: String,
        required: true
    },
    registrationID: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    TIN: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    workforceSize: {
        type: Number,
        required: true
    },
    paymentPerTonnage: {
        type: Number,
        required: true
    },
    requiredAmountPerDay: {
        type: Number,
        required: true
    },
    contractDuration: {
        type: Number,
        required: true
    },
    areaOfCollection: {
        type: Number,
        required: true
    },
    designatedSTS: {
        type: Number,
        required: true
    },
    contractorManager: [String]
});

module.exports = mongoose.model("contractor_company", ContractorCompanySchema);
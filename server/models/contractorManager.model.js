const mongoose = require("mongoose");


const ContractorManagerSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    role:{
        type: String,
        default: "unassigned",

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfAccountCreation: {
        type: Date,
        required: true,
        default: Date.now
    },
    contactNumber: {
        type: String,
        required: true
    },
    assignedContractorCompany: {
        type: Number,
        required: true
    },
  
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("contractor_manager", ContractorManagerSchema);
const mongoose = require("mongoose");


const ContractorManagerSchema =  mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    emailAddress: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contractor_company',
        required: true
    },
    accessLevel: {
        type: String,
        enum: ['contractor', 'user'],
        default: 'user'
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
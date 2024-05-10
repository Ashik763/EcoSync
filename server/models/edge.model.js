// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const edgeSchema = mongoose.Schema({


    source: {
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

module.exports = mongoose.model("edge", edgeSchema);

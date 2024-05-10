// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const Schema

const coordinateSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },

    x: {
         type: Number,
          required: true
     },
    y: {
         type: Number,
          required: true
     },

  
});

module.exports = mongoose.model("coordinate", coordinateSchema);

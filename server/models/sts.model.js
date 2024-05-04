// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const Schema

const stsSchema = mongoose.Schema({
  ward_number: {
    type: Number,
    unique: true,
    required: true,
  },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  capacity: {
    type: Number,

    required: true,
  },
  userId: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  vehicle_number: {
    type: []
  }
});

module.exports = mongoose.model("sts", stsSchema);

const mongoose = require("mongoose");

const dumpingTruckEntrySchema = mongoose.Schema({
  volume_of_waste: {
    type: Number,
    required: true,
  },
  time_of_arrival: {
    type: String,
    required: true,
  },
  time_of_departure: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dumpingTruckEntry", dumpingTruckEntrySchema);

// any:{} could be use in the mongoose schema

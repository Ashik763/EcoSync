const mongoose = require("mongoose");

const dumpingTruckEntrySchema = mongoose.Schema({
  landfill_id: {
    // ward_no.
    type: Number,
    required: true,
  },
  vehicle_number: {
    type: Number,
    unique: true,
    required: true,
  },

  weight_of_waste: {
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

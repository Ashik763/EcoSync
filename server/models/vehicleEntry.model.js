const mongoose = require("mongoose");

const vehicleEntrySchema = mongoose.Schema({
  sts_id: {
    // ward_no.
    type: Number,
    required: true,
  },
  vehicle_number: {
    type: Number,
    unique: true,
    required: true,
  },

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

module.exports = mongoose.model("vehicleEntry", vehicleEntrySchema);

// any:{} could be use in the mongoose schema

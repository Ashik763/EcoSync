const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  vehicle_number: {
    type: Number,
    // unique: true,
    required: true,
  },
  type: {
    type: String,
    // enum: ["open_truck", "dump_truck", "compactor", "container_carrier"],

    required: true,
  },
  capacity: {
    type: Number,
    // enum: ["3", "5", "7", "15"],
    required: true,
  },
  loaded_fuel_cost_per_kilometer: {
    type: Number,
    required: true,
  },

  unloaded_fuel_cost_per_kilometer: {
    type: Number,
    required: true,
  }
  
});

module.exports = mongoose.model("vehicle", vehicleSchema);

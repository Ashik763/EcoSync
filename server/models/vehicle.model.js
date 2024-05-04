const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  vehicle_number: {
    type: String,
    // unique: true,
    required: true,
  },
  type: {
    type: String,
    // enum: ["open_truck", "dump_truck", "compactor", "container_carrier"],

    required: true,
  },
  capacity: {
    type: String,
    // enum: ["3", "5", "7", "15"],
    required: true,
  },
  loaded_fuel_cost_per_kilometer: {
    type: String,
    required: true,
  },

  unloaded_fuel_cost_per_kilometer: {
    type: String,
    required: true,
  },
  // ward_number: {
  //   type: [],
  //   required: true,
  // },
  
});

module.exports = mongoose.model("vehicle", vehicleSchema);

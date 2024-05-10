const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const billingSchema = mongoose.Schema({
    total_fuel_cost: {
    type: Number,
    required: true,
  },
  passed_path: {
    type: Number,
    required: true,
  },
  vehicle_number: {
    type: Number,
    required: true,
  },
  vehicle_capacity: {
    type: Number,
    required: true,
  },
 
  weight_of_waste: {
    type: Number,
    required: true,
  },
  time_of_departure: {
    type: Date,
    required: true,
  },
  time_of_arrival: {
    type: Date,
    required: true,
  },

  departure_place:{
    sts_capacity: {
        type: Number,
        required: true
    },
    ward_number: {
        type: Number,
        required: true
    },
    coordinates:{
        x:{
            type: Number,
            required: true
        },
        y:{
            type: Number,
            required: true
        }
    }
  },
  destination_place: {
    destination_name: {
        type: String,
        required: true
    },
    landfill_id: {
        type: Number,
        required: true
    },

  }

},{ timestamps: true });

module.exports = mongoose.model("billing", billingSchema);

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const landfillSchema = new Schema({
    landfill_id: {
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
      name:{
        type: String,
        required: [true, "name is required"],
      },
      operational_time:{
        from: Date,
        to: Date,
        current_date: Date
      },
      userId: {
        type: [Schema.Types.ObjectId],
        ref: "User",
      }

});

module.exports = mongoose.model("landfill", landfillSchema);

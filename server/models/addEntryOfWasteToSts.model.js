const mongoose = require("mongoose");


const addEntryOfWasteToStsSchema =  mongoose.Schema({
  timeAndDateOfCollection: {
      type: Date,
      required: true
  },
  amountOfWasteCollected: {
      type: Number,
      required: true
  },
  _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contractor_manager',
      required: true
  },
  contractorID: {
      type: Number,
      required: true
  },
  typeOfWasteCollected: {
      type: String,
      enum: ['Domestic', 'Plastic', 'Construction Waste'],
      required: true
  },
  designatedSTSForDeposit: {
      type: Number,
      required: true
  },
  vehicleUsedForTransportation: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model("wastage", addEntryOfWasteToStsSchema);
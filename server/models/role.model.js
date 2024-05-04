const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  role: { type: String },
});

module.exports = mongoose.model("role", roleSchema);

// any:{} could be use in the mongoose schema

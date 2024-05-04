const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["system_admin", "sts_manager", "landfill_manager", "unassigned"],

    default: "unassigned",
  },
  profile: { type: Object, default: {} },
  firstTimeLogin: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSchema);

// any:{} could be use in the mongoose schema

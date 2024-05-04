import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "name is required"],
  },
});

export const Category = model("Category", categorySchema);

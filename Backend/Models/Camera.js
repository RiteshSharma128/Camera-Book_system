

import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  pricePerDay: { type: Number, required: true },
  image: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true}, // required: true
}, { timestamps: true });

export default mongoose.model("Camera", cameraSchema);


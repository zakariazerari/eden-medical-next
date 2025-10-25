import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  age: { type: Number, required: true, min: 18, max: 70 },
  image: { type: String, default: null },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// ✅ Add indexes for faster queries
driverSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.models.Driver || mongoose.model("Driver", driverSchema);
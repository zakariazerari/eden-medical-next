import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// ✅ ADD INDEXES for performance
DriverSchema.index({ isActive: 1 });
DriverSchema.index({ createdAt: -1 });

export default mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
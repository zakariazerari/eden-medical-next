import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  patientName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: true }
}, {
  timestamps: true
});

// ✅ ADD INDEXES for performance
ReviewSchema.index({ driverId: 1, isApproved: 1 });
ReviewSchema.index({ isApproved: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
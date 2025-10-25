import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Driver", 
    required: true 
  },
  patientName: { type: String, required: true, trim: true, maxlength: 100 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, maxlength: 500, trim: true },
  ipAddress: { type: String, select: false },
  isApproved: { type: Boolean, default: true } // ✅ Auto-approve
}, { timestamps: true });

// ✅ Add indexes for faster queries
reviewSchema.index({ driverId: 1, isApproved: 1, createdAt: -1 });
reviewSchema.index({ isApproved: 1 });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
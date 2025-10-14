// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true,
      index: true,
    },
    patientName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: 500,
      trim: true,
    },
    ipAddress: {
      type: String,
      select: false, // Ma kaybench f queries normal
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin khasso ywafeq 3la review
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.ipAddress;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Composite index for better query performance
reviewSchema.index({ driverId: 1, isApproved: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
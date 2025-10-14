// models/Driver.js
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 18,
      max: 70,
    },
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    },
  }
);

// Virtual للحصول على Reviews من collection منفصلة
driverSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'driverId'
});

// Index for faster active driver queries
driverSchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.models.Driver || mongoose.model("Driver", driverSchema);
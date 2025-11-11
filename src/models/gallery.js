import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["vehicles", "interior", "staff"],
      default: "vehicles",
    },
    image_url: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ✅ ADD INDEXES for better performance
GallerySchema.index({ category: 1, createdAt: -1 });
GallerySchema.index({ createdAt: -1 });

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
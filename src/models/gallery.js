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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
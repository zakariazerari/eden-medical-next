import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Gallery from "@/models/gallery";
import { unlink } from "fs/promises";
import path from "path";

// DELETE - Remove image
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    // Find and delete image from MongoDB
    const image = await Gallery.findByIdAndDelete(id);
    
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete file from disk
    try {
      const filePath = path.join(process.cwd(), "public", image.image_url);
      await unlink(filePath);
      console.log("✅ File deleted:", filePath);
    } catch (err) {
      console.error("⚠️ File deletion error (file may not exist):", err.message);
      // Continue even if file deletion fails
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image: " + error.message },
      { status: 500 }
    );
  }
}

// GET - Get single image (optional)
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const image = await Gallery.findById(id);
    
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: image._id.toString(),
      title: image.title,
      category: image.category,
      image_url: image.image_url,
      created_at: image.createdAt,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

// PUT - Update image info (optional)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    const { title, category } = body;

    if (!title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      { title, category },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Image updated successfully",
      image: {
        id: updatedImage._id.toString(),
        title: updatedImage.title,
        category: updatedImage.category,
        image_url: updatedImage.image_url,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 }
    );
  }
}
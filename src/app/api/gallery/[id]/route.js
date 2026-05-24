import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Gallery from "@/models/gallery";
import { unlink } from "fs/promises";
import path from "path";
import { requireAdminAuth } from "@/utils/adminAuth";

// DELETE - Remove image - Admin only
export async function DELETE(request, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;

    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    try {
      const filePath = path.join(process.cwd(), "public", image.image_url);
      await unlink(filePath);
    } catch (err) {
      console.error("⚠️ File deletion error:", err.message);
    }

    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete image: " + error.message }, { status: 500 });
  }
}

// GET - Get single image (public)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const image = await Gallery.findById(id).lean();

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
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}

// PUT - Update image info - Admin only
export async function PUT(request, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;
    const { title, category } = await request.json();

    if (!title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["vehicles", "interior", "staff"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
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
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}

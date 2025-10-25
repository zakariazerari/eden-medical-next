import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Gallery from "@/models/gallery";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET - Fetch all gallery images
export async function GET() {
  try {
    await connectDB();
    const images = await Gallery.find().sort({ createdAt: -1 });
    
    // Convert MongoDB _id to id for frontend compatibility
    const formattedImages = images.map(img => ({
      id: img._id.toString(),
      title: img.title,
      category: img.category,
      image_url: img.image_url,
      created_at: img.createdAt,
    }));
    
    return NextResponse.json(formattedImages);
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// POST - Upload new image
export async function POST(request) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const file = formData.get("image");

    if (!title || !category || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate category
    if (!["vehicles", "interior", "staff"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Save to MongoDB
    const imageUrl = `/uploads/${fileName}`;
    const newImage = await Gallery.create({
      title,
      category,
      image_url: imageUrl,
    });

    return NextResponse.json({
      success: true,
      id: newImage._id.toString(),
      image_url: imageUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image: " + error.message },
      { status: 500 }
    );
  }
}
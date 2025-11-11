import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Gallery from "@/models/gallery";
import { writeFile, mkdir } from "fs/promises";
import sharp from "sharp";
import path from "path";

// ✅ GET - Fetch gallery images (default 50)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50; // ✅ Default 50
    const skip = parseInt(searchParams.get('skip')) || 0;
    const category = searchParams.get('category');
    
    // Build query
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // ✅ OPTIMIZED: Use lean() for faster queries
    const images = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();
    
    const formattedImages = images.map(img => ({
      id: img._id.toString(),
      title: img.title,
      category: img.category,
      image_url: img.image_url,
      created_at: img.createdAt,
    }));
    
    return NextResponse.json(formattedImages, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// POST - Upload new image with compression
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

    // Compress image with Sharp
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const compressedBuffer = await sharp(buffer)
      .resize(1200, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toBuffer();

    // Save compressed file
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, compressedBuffer);

    console.log("✅ Image compressed and saved:", fileName);

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

// DELETE - Delete image
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Image ID required" }, { status: 400 });
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: "Image deleted successfully" 
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
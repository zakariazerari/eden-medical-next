// app/api/blog/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import BlogPost from "@/models/BlogPost";

// GET: Fetch all published blog posts
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 100;
    
    let query = { published: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    return NextResponse.json({
      success: true,
      posts
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
      }
    });
  } catch (error) {
    console.error("❌ GET blog error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blog posts" },
      { status: 500 }
    );
  }
}

// POST: Create new blog post (Admin only - add auth later)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { success: false, message: "Title, slug, and content are required" },
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existing = await BlogPost.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }
    
    // Calculate read time (approx 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    
    const post = await BlogPost.create({
      ...body,
      readTime,
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.excerpt
    });
    
    return NextResponse.json({
      success: true,
      post
    }, { status: 201 });
  } catch (error) {
    console.error("❌ POST blog error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error creating post" },
      { status: 500 }
    );
  }
}
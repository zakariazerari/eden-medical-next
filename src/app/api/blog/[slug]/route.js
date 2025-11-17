// Single Post API - Get post by slug (FIXED for Next.js 15)
// Location: /app/api/blog/[slug]/route.js

import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongo';
import BlogPost from '@/models/BlogPost';

export async function GET(request, context) {
  try {
    await connectDB();

    // ✅ AWAIT params in Next.js 15
    const params = await context.params;
    const slug = params.slug;

    const post = await BlogPost.findOne({ 
      slug: slug, 
      published: true 
    }).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment views
    await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    return NextResponse.json({
      success: true,
      post
    });

  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}
// Public Blog API - Get published posts only
// Location: /app/api/blog/route.js

import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/mongo';
import BlogPost from '@/models/BlogPost';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Query only published posts
    let query = { published: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      posts
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts', posts: [] },
      { status: 500 }
    );
  }
}
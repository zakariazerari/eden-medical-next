// Complete Blog API Route with Better Error Handling
// Location: /app/api/admin/blog/route.js

import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongo";
import BlogPost from '@/models/BlogPost';
import { requireAdminAuth } from "@/utils/adminAuth";

// GET - Fetch all blog posts - Admin only
export async function GET(request) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    let query = {};
    if (published !== null) {
      query.published = published === 'true';
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      posts
    });

  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post - Admin only
export async function POST(request) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  console.log('📝 POST /api/admin/blog - Starting...');
  
  try {
    // Connect to database
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected');

    // Parse request body
    console.log('📦 Parsing request body...');
    const body = await request.json();
    console.log('📋 Request data:', {
      title: body.title,
      excerpt: body.excerpt?.substring(0, 50) + '...',
      contentLength: body.content?.length,
      category: body.category,
      tagsCount: body.tags?.length,
      published: body.published
    });
    
    // Validate required fields
    if (!body.title || !body.excerpt || !body.content) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          details: {
            title: !body.title ? 'Title is required' : null,
            excerpt: !body.excerpt ? 'Excerpt is required' : null,
            content: !body.content ? 'Content is required' : null
          }
        },
        { status: 400 }
      );
    }

    // Create new blog post
    console.log('💾 Creating blog post...');
    const blogPost = await BlogPost.create({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category || 'Medical Transport',
      tags: Array.isArray(body.tags) ? body.tags : [],
      featuredImage: body.featuredImage || '',
      metaDescription: body.metaDescription || '',
      published: Boolean(body.published),
      author: body.author || 'Eden Medical Transport'
    });

    console.log('✅ Blog post created successfully:', blogPost._id);

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully!',
      post: {
        _id: blogPost._id,
        title: blogPost.title,
        slug: blogPost.slug,
        published: blogPost.published
      }
    }, { status: 201 });

  } catch (error) {
    console.error('❌ ERROR creating blog post:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Send detailed error to client
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create blog post',
        errorType: error.name,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
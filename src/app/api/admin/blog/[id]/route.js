// app/api/admin/blog/[id]/route.js - Edit/Delete Blog Post
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo"
import BlogPost from "@/models/BlogPost";

// PATCH: Update post (publish/unpublish)
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    const post = await BlogPost.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error updating post" },
      { status: 500 }
    );
  }
}

// DELETE: Delete post
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}
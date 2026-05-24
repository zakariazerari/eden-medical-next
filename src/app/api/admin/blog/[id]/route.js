import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import BlogPost from "@/models/BlogPost";
import { requireAdminAuth } from "@/utils/adminAuth";

// PATCH: Update post - Admin only
export async function PATCH(request, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}

// DELETE: Delete post - Admin only
export async function DELETE(request, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;

    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
  }
}

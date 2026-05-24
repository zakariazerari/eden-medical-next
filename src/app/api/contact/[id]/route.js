import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { requireAdminAuth } from "@/utils/adminAuth";

// PATCH: Update message status - Admin only
export async function PATCH(req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;
    const { status } = await req.json();

    if (!status || !['pending', 'confirmed', 'canceled'].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true, lean: true } // ✅ Add lean
    );

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("❌ PATCH message error:", error);
    return NextResponse.json(
      { message: "Error updating message" },
      { status: 500 }
    );
  }
}

// DELETE: Delete message - Admin only
export async function DELETE(req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ DELETE message error:", error);
    return NextResponse.json(
      { message: "Error deleting message" },
      { status: 500 }
    );
  }
}
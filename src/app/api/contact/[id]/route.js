// app/api/contact/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";

// PATCH: Update message status
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { status } = await req.json();

    // Validation
    if (!status || !['pending', 'confirmed', 'canceled'].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
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

// DELETE: Delete message
export async function DELETE(req, { params }) {
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
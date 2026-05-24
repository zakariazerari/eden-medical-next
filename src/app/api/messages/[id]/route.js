import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { requireAdminAuth } from "@/utils/adminAuth";

export async function PATCH(req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { status } = await req.json();
    const { id } = params;

    if (!status || !['pending', 'confirmed', 'canceled'].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, lean: true }
    );

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = params;
    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

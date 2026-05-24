import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { requireAdminAuth } from "@/utils/adminAuth";

// PATCH: Update booking status - Admin only
export async function PATCH(req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = await params; // ✅ FIXED: Added await
    const { status } = await req.json();

    if (!status || !['pending', 'confirmed', 'canceled'].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true, lean: true }
    );

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("❌ PATCH booking error:", error);
    return NextResponse.json(
      { message: "Error updating booking" },
      { status: 500 }
    );
  }
}

// DELETE: Delete booking - Admin only
export async function DELETE(req, { params }) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    await connectDB();
    const { id } = await params; // ✅ FIXED: Added await

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ DELETE booking error:", error);
    return NextResponse.json(
      { message: "Error deleting booking" },
      { status: 500 }
    );
  }
}
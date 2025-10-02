import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { status } = await req.json();
    const { id } = params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

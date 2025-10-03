import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer";

// GET: Fetch ALL bookings (no date filter)
export async function GET() {
  try {
    await connectDB();

    // Fetch ALL bookings, sorted by newest first
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(200); // Limit to 200 for performance

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

// POST: Create new booking + send email
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const booking = await Booking.create(body);
    await sendMail(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("API POST error:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
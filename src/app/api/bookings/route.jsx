// app/api/bookings/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer";

// GET: Fetch ALL bookings
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(500);

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

// POST: Create new booking
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Validation
    if (!body.serviceType || !body.mobility || !body.date || !body.time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!body.patientName || !body.phone || !body.email) {
      return NextResponse.json(
        { message: "Patient information is required" },
        { status: 400 }
      );
    }

    if (!body.pickup || !body.destination) {
      return NextResponse.json(
        { message: "Pickup and destination are required" },
        { status: 400 }
      );
    }

    // Get IP address for spam protection
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // Create booking
    const booking = await Booking.create({
      ...body,
      ipAddress: ip,
      status: 'pending'
    });

    // Send email notification (async, don't block response)
    try {
      await sendMail(body);
      console.log("✅ Booking email sent successfully");
    } catch (emailError) {
      console.error("⚠️ Email failed but booking saved:", emailError);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("❌ POST booking error:", error);
    return NextResponse.json(
      { message: error.message || "Error creating booking" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer";
import { logError, logSuccess } from "@/lib/logger";

// GET: Fetch ALL bookings - OPTIMIZED
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 100; // ✅ Reduced from 500

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('serviceType mobility date time pickup destination patientName phone email status createdAt') // ✅ Only needed fields
      .lean();

    return NextResponse.json(bookings, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' // ✅ Cache 1 min
      }
    });
  } catch (error) {
    logError(error, { route: '/api/bookings', method: 'GET' });
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}

// POST: Create new booking (keep as is)
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

    // Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // Create booking
    const booking = await Booking.create({
      ...body,
      ipAddress: ip,
      status: 'pending'
    });

    logSuccess("✅ Booking created", { bookingId: booking._id });

    // Send email (async, non-blocking)
    sendMail(body).catch(err => logError(err, { context: 'sendMail after booking' }));

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    logError(error, { route: '/api/bookings', method: 'POST' });
    return NextResponse.json(
      { message: error.message || "Error creating booking" },
      { status: 500 }
    );
  }
}
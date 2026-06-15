import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer";
import { logError, logSuccess } from "@/lib/logger";
import { validateBookingData } from '@/utils/secureValidation';

const rateLimit = new Map();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimit.get(ip) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    rateLimit.set(ip, { count: 1, start: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  rateLimit.set(ip, entry);
  return false;
}

// GET: Fetch ALL bookings - OPTIMIZED
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 100;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('serviceType mobility date time appointmentTime returnTime pickup destination patientName phone email status createdAt')
      .lean();

    return NextResponse.json(bookings, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
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

// POST: Create new booking - ENHANCED WITH VALIDATION
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Comprehensive validation and sanitization
    const validation = validateBookingData(body);
    
    if (!validation.valid) {
      console.warn('🚨 Invalid booking data:', validation.errors);
      return NextResponse.json(
        { message: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Use sanitized data
    const sanitizedData = validation.sanitized;

    // Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    if (checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please wait 10 minutes before trying again." },
        { status: 429 }
      );
    }

    // Create booking with sanitized data
    const booking = await Booking.create({
      ...sanitizedData,
      ipAddress: ip,
      status: 'pending'
    });

    logSuccess("✅ Booking created", { bookingId: booking._id });

    // Send email (async, non-blocking)
    sendMail(sanitizedData).catch(err => logError(err, { context: 'sendMail after booking' }));

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    logError(error, { route: '/api/bookings', method: 'POST' });
    return NextResponse.json(
      { message: error.message || "Error creating booking" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer";
import { logError, logSuccess } from "@/lib/logger";
import { validateBookingData } from '@/utils/secureValidation';

// GET: Fetch ALL bookings
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

// POST: Create new booking with EMAIL
export async function POST(req) {
  try {
    // Connect to database
    await connectDB();
    
    // Parse request body
    const body = await req.json();

    // Validate data
    const validation = validateBookingData(body);
    
    if (!validation.valid) {
      console.warn('🚨 Invalid booking data:', validation.errors);
      return NextResponse.json(
        { message: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    const sanitizedData = validation.sanitized;

    // Get IP address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // Create booking in database
    const booking = await Booking.create({
      ...sanitizedData,
      ipAddress: ip,
      status: 'pending'
    });

    console.log("✅ Booking created successfully:", booking._id);
    logSuccess("✅ Booking created", { bookingId: booking._id });

    // ✅ SEND EMAIL AND WAIT (FIXED!)
    try {
      console.log("📧 Attempting to send email...");
      console.log("📧 Email credentials check:", {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
        hasEmailTo: !!process.env.EMAIL_TO
      });

      const emailResult = await sendMail(sanitizedData);
      
      if (emailResult && emailResult.success) {
        console.log("✅ Email sent successfully!");
      } else {
        console.error("❌ Email failed:", emailResult?.error || "Unknown error");
      }
    } catch (emailError) {
      console.error("❌ Email sending error:", emailError);
      console.error("❌ Email error details:", emailError.message);
      logError(emailError, { 
        context: 'sendMail after booking',
        bookingId: booking._id 
      });
      // Don't fail the request - booking is saved
    }

    // Return success
    return NextResponse.json({
      success: true,
      booking: booking,
      message: "Booking created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Booking creation error:", error);
    logError(error, { route: '/api/bookings', method: 'POST' });
    
    return NextResponse.json(
      { 
        success: false,
        message: error.message || "Error creating booking" 
      },
      { status: 500 }
    );
  }
}
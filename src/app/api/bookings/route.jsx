import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer"; // ✅ استدعاء المرسل

// ✅ GET: جلب جميع الحجوزات
export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("❌ API GET error:", error);
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}

// ✅ POST: إنشاء حجز جديد + إرسال إيميل
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // إنشاء الحجز
    const booking = await Booking.create(body);

    // إرسال إيميل تأكيد
    await sendMail(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("❌ API POST error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

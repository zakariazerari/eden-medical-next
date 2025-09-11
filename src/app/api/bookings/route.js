import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer"; // ✅ استدعاء المرسل

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const booking = await Booking.create(body);

    // ✅ إرسال إيميل بعد إنشاء الحجز
    await sendMail(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("❌ API POST error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
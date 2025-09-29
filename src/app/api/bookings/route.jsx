import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Booking from "@/models/Booking";
import { sendMail } from "@/lib/mailer"; // ✅ استدعاء المرسل

// ✅ GET: جلب الحجوزات ديال آخر 7 أيام فقط
export async function GET() {
  try {
    await connectDB();

    // 🔹 غير آخر 7 أيام
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const bookings = await Booking.find({
      createdAt: { $gte: oneWeekAgo },
    }).sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("❌ API GET error:", error);
    return NextResponse.json(
      { message: "Error fetching bookings" },
      { status: 500 }
    );
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
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

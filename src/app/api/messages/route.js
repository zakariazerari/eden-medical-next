import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Message from "@/models/contact";

// 📨 GET: جلب آخر 7 أيام فقط
export async function GET() {
  try {
    await connectDB();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const messages = await Message.find({
      createdAt: { $gte: oneWeekAgo }
    }).sort({ createdAt: -1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("❌ GET messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// 📨 POST: إنشاء رسالة جديدة
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const message = await Message.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("❌ POST messages error:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}

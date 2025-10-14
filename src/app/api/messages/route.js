// src/app/api/messages/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";

// GET: Fetch recent messages (last 7 days)
export async function GET() {
  try {
    await connectDB();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const messages = await ContactMessage.find({
      createdAt: { $gte: oneWeekAgo }
    }).sort({ createdAt: -1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST: Create new message
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
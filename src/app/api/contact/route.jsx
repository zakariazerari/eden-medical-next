// app/api/contact/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { sendContactMail } from "@/lib/mailer";

// GET: Fetch all messages
export async function GET() {
  try {
    await connectDB();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(500);

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("❌ GET messages error:", error);
    return NextResponse.json(
      { message: "Error fetching messages" },
      { status: 500 }
    );
  }
}

// POST: Create new contact message
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Validation
    if (!body.fullName || body.fullName.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Full name is required" },
        { status: 400 }
      );
    }

    if (!body.email || body.email.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    if (!body.message || body.message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 5 characters" },
        { status: 400 }
      );
    }

    // Get IP address for spam protection
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // ⚠️ Spam check temporarily disabled for testing
    // const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    // const recentMessage = await ContactMessage.findOne({
    //   ipAddress: ip,
    //   createdAt: { $gte: fiveMinutesAgo }
    // }).select('+ipAddress');

    // if (recentMessage) {
    //   return NextResponse.json(
    //     { message: "Please wait before sending another message" },
    //     { status: 429 }
    //   );
    // }

    // Create message
    const message = await ContactMessage.create({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone ? body.phone.trim() : '',
      message: body.message.trim(),
      ipAddress: ip,
      status: 'pending'
    });

    // Send email notification (async, don't block response)
    try {
      await sendContactMail({
        fullName: message.fullName,
        email: message.email,
        message: message.message
      });
      console.log("✅ Contact email sent successfully");
    } catch (emailError) {
      console.error("⚠️ Email failed but message saved:", emailError);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully",
        data: {
          _id: message._id,
          fullName: message.fullName,
          email: message.email,
          createdAt: message.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST message error:", error);
    return NextResponse.json(
      { message: error.message || "Error sending message" },
      { status: 500 }
    );
  }
}
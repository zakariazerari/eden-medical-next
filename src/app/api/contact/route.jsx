import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { sendContactMail } from "@/lib/mailer";

// GET: Fetch all messages - OPTIMIZED
export async function GET() {
  try {
    await connectDB();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();

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

    console.log("📝 Contact form data received:", body); // ✅ Debug

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

    // Get IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // Create message
    const message = await ContactMessage.create({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone ? body.phone.trim() : '',
      message: body.message.trim(),
      ipAddress: ip,
      status: 'pending'
    });

    console.log("✅ Message saved to database:", message._id);

    // ✅ FIXED: Send email WITH PHONE NUMBER
    const emailData = {
      fullName: message.fullName,
      email: message.email,
      phone: message.phone || "Not provided",
      message: message.message
    };

    console.log("📧 Sending email with data:", emailData); // ✅ Debug

    sendContactMail(emailData).catch(err => {
      console.error("❌ Email error:", err);
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully",
        data: {
          _id: message._id,
          fullName: message.fullName,
          email: message.email,
          phone: message.phone,
          createdAt: message.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST message error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error sending message" },
      { status: 500 }
    );
  }
}
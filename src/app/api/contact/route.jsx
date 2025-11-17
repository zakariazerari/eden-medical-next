// app/api/contact/route.jsx - ✅ UPDATED WITH VALIDATION
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { sendContactMail } from "@/lib/mailer";
import { validateEmail, sanitizeString } from '@/utils/secureValidation'; // ✅ ADDED

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

// POST: Create new contact message - ✅ ENHANCED WITH VALIDATION
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("📩 Contact form data received:", body);

    // ✅ ADDED: Validate email
    const emailValidation = validateEmail(body.email);
    if (!emailValidation.valid) {
      console.warn('🚨 Invalid email:', body.email);
      return NextResponse.json(
        { success: false, message: emailValidation.error },
        { status: 400 }
      );
    }

    // ✅ ADDED: Sanitize name
    const nameValidation = sanitizeString(body.fullName, 100);
    if (!nameValidation.valid) {
      console.warn('🚨 Invalid name:', body.fullName);
      return NextResponse.json(
        { success: false, message: 'Invalid name: ' + nameValidation.error },
        { status: 400 }
      );
    }

    // ✅ ADDED: Sanitize message
    const messageValidation = sanitizeString(body.message, 1000);
    if (!messageValidation.valid) {
      console.warn('🚨 Invalid message:', body.message?.substring(0, 50));
      return NextResponse.json(
        { success: false, message: 'Invalid message: ' + messageValidation.error },
        { status: 400 }
      );
    }

    // Get IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.ip || "unknown";

    // ✅ Create message with sanitized data
    const message = await ContactMessage.create({
      fullName: nameValidation.value,
      email: emailValidation.value,
      phone: body.phone ? body.phone.trim() : '',
      message: messageValidation.value,
      ipAddress: ip,
      status: 'pending'
    });

    console.log("✅ Message saved to database:", message._id);

    // ✅ Send email with sanitized data
    const emailData = {
      fullName: nameValidation.value,
      email: emailValidation.value,
      phone: body.phone || "Not provided",
      message: messageValidation.value
    };

    console.log("📧 Sending email with data:", emailData);

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
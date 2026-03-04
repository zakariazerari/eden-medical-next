// app/api/contact/route.jsx

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";
import { sendContactMail } from "@/lib/mailer";
import { validateEmail, sanitizeString } from '@/utils/secureValidation';

// GET: Fetch all messages
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

// POST: Create new contact message - FIXED EMAIL!
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("📩 Contact form data received:", body);

    // Validate email
    const emailValidation = validateEmail(body.email);
    if (!emailValidation.valid) {
      console.warn('🚨 Invalid email:', body.email);
      return NextResponse.json(
        { success: false, message: emailValidation.error },
        { status: 400 }
      );
    }

    // Sanitize name
    const nameValidation = sanitizeString(body.fullName, 100);
    if (!nameValidation.valid) {
      console.warn('🚨 Invalid name:', body.fullName);
      return NextResponse.json(
        { success: false, message: 'Invalid name: ' + nameValidation.error },
        { status: 400 }
      );
    }

    // Sanitize message
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

    // Create message with sanitized data
    const message = await ContactMessage.create({
      fullName: nameValidation.value,
      email: emailValidation.value,
      phone: body.phone ? body.phone.trim() : '',
      message: messageValidation.value,
      ipAddress: ip,
      status: 'pending'
    });

    console.log("✅ Message saved to database:", message._id);

    // ✅ SEND EMAIL AND WAIT (FIXED!)
    try {
      console.log("📧 Attempting to send contact email...");
      console.log("📧 Email credentials check:", {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
        hasEmailTo: !!process.env.EMAIL_TO
      });

      const emailData = {
        fullName: nameValidation.value,
        email: emailValidation.value,
        phone: body.phone || "Not provided",
        message: messageValidation.value
      };

      const emailResult = await sendContactMail(emailData);
      
      if (emailResult && emailResult.success) {
        console.log("✅ Contact email sent successfully!");
      } else {
        console.error("❌ Contact email failed:", emailResult?.error || "Unknown error");
      }
    } catch (emailError) {
      console.error("❌ Contact email error:", emailError);
      console.error("❌ Email error details:", emailError.message);
      // Don't fail the request - message is saved
    }

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
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongo";        // استيراد دالة الربط
import ContactMessage from "@/models/ContactMessage";  // استيراد الموديل

export async function POST(req) {
  const { fullName, email, message } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // 1. ربط بـ MongoDB
    await connectDB();

    // 2. حفظ الرسالة في القاعدة
    await ContactMessage.create({ fullName, email, message });

    // 3. إعداد transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "📩 New Contact Message",
      html: `
        <h2>New Message from Contact Form</h2>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong><br />${message}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent and saved successfully" });
  } catch (error) {
    console.error("Error saving or sending contact message:", error);
    return NextResponse.json(
      { error: "Failed to send or save message" },
      { status: 500 }
    );
  }
}

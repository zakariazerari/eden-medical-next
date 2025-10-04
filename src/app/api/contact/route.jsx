import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";

// POST: Save + send email
export async function POST(req) {
  const { fullName, email, phone, message } = await req.json(); // ✅ Zedna phone

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await connectDB();

    // Save in MongoDB with phone
    await ContactMessage.create({ fullName, email, phone, message }); // ✅ Zedna phone

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: "📩 New Contact Message",
      html: `
        <h2>New Message from Contact Form</h2>
        <ul>
          <li><strong>Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li><strong>Message:</strong><br />${message}</li>
        </ul>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// GET: Fetch ALL messages
export async function GET() {
  try {
    await connectDB();

    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(200);

    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
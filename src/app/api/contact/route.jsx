import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongo";
import ContactMessage from "@/models/ContactMessage";

// ✅ POST: Save + send email
export async function POST(req) {
  const { fullName, email, message } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await connectDB();

    // ⬅️ Save in MongoDB
    await ContactMessage.create({ fullName, email, message });

    // ⬅️ Send mail
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
    console.error("❌ Error saving/sending contact message:", error);
    return NextResponse.json(
      { error: "Failed to send or save message" },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch last 7 days messages
export async function GET() {
  try {
    await connectDB();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const messages = await ContactMessage.find({
      createdAt: { $gte: oneWeekAgo },
    }).sort({ createdAt: -1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

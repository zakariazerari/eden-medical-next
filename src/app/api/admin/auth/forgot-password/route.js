import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectDB();

    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
      resetToken: String,
      resetTokenExpiry: Date,
    });

    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    admin.resetToken = resetToken;
    admin.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await admin.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Eden Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#7c3aed;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
// src/app/api/admin/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Define Admin Schema
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
      resetToken: String,
      resetTokenExpiry: Date,
    }, { timestamps: true });

    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      // Don't reveal if email exists or not (security)
      return NextResponse.json({
        success: true,
        message: "If that email exists, we sent a reset link"
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Save token to admin
    admin.resetToken = resetToken;
    admin.resetTokenExpiry = resetTokenExpiry;
    await admin.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/admin/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Eden Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .warning { color: #e53e3e; font-size: 14px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <p>Hi Admin,</p>
              <p>You requested to reset your password. Click the button below to reset it:</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <p>Or copy this link:</p>
              <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
              
              <p class="warning">⚠️ This link expires in 1 hour.</p>
              <p class="warning">If you didn't request this, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "If that email exists, we sent a reset link"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Error processing request" },
      { status: 500 }
    );
  }
}
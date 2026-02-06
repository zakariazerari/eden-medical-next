// app/api/admin/auth/forgot-password/route.js - COMPLETE FIXED VERSION
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("📧 Forgot password request received");
    
    await connectDB();
    console.log("✅ Database connected");

    const { email } = await req.json();

    if (!email) {
      console.log("❌ No email provided");
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    console.log("📨 Processing reset for:", email);

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
      console.log("⚠️ Admin not found for email:", email);
      // Don't reveal if email exists or not (security)
      return NextResponse.json({
        success: true,
        message: "If that email exists, we sent a reset link"
      });
    }

    console.log("✅ Admin found:", admin.email);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // ✅ FIXED: 24 hours instead of 1 hour
    const resetTokenExpiry = new Date(Date.now() + 86400000); // 24 hours

    // Save token to admin
    admin.resetToken = resetToken;
    admin.resetTokenExpiry = resetTokenExpiry;
    await admin.save();

    console.log("✅ Token saved to database");
    console.log("🔑 Token:", resetToken.substring(0, 15) + "...");
    console.log("⏰ Expires at:", resetTokenExpiry.toISOString());

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Email credentials missing in environment variables");
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/admin/reset-password?token=${resetToken}`;
    
    console.log("📧 Sending email to:", email);
    console.log("🔗 Reset URL:", resetUrl);

    await transporter.sendMail({
      from: `"Eden Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Password Reset Request - Eden Medical",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
            .code { background: #f0f0f0; padding: 15px; border-radius: 5px; font-family: monospace; word-break: break-all; margin: 15px 0; }
            .warning { color: #e53e3e; font-size: 14px; margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
              <p>Eden Medical Transport Admin</p>
            </div>
            <div class="content">
              <p>Hi Admin,</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              
              <center>
                <a href="${resetUrl}" class="button">Reset Password Now</a>
              </center>
              
              <p>Or copy and paste this link into your browser:</p>
              <div class="code">${resetUrl}</div>
              
              <p class="warning">⚠️ This link is valid for 24 hours only.</p>
              <p class="warning">⚠️ If you didn't request this reset, please ignore this email and contact support immediately.</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
              
              <p style="font-size: 12px; color: #888;">
                <strong>Security Notice:</strong><br>
                • Never share this link with anyone<br>
                • This email was sent from Eden Medical Transport<br>
                • Request time: ${new Date().toLocaleString()}<br>
                • Expires: ${resetTokenExpiry.toLocaleString()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ Email sent successfully!");

    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {
    console.error("❌ Forgot password error:", error);
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);
    
    return NextResponse.json(
      { success: false, message: "Error processing request: " + error.message },
      { status: 500 }
    );
  }
}
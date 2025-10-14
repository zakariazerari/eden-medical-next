// src/app/api/admin/auth/reset-password/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token and password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
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

    // Find admin with valid token
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    admin.password = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Error resetting password" },
      { status: 500 }
    );
  }
}
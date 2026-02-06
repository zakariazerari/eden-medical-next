// app/api/admin/auth/reset-password/route.js - ENHANCED VERSION
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("🔐 Reset password request received");
    
    await connectDB();
    console.log("✅ Database connected");

    const { token, newPassword } = await req.json();

    console.log("📝 Token received:", token ? token.substring(0, 15) + "..." : "NONE");

    if (!token || !newPassword) {
      console.log("❌ Missing token or password");
      return NextResponse.json(
        { success: false, message: "Token and password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      console.log("❌ Password too short");
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

    console.log("🔍 Looking for admin with token...");

    // Find admin with valid token
    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!admin) {
      console.log("❌ Admin not found or token expired");
      
      // Check if token exists but expired
      const expiredAdmin = await Admin.findOne({ resetToken: token });
      if (expiredAdmin) {
        console.log("⚠️ Token found but EXPIRED");
        console.log("Token expiry was:", expiredAdmin.resetTokenExpiry);
        console.log("Current time:", new Date());
      } else {
        console.log("⚠️ Token not found in database at all");
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid or expired reset token. Please request a new reset link." 
        },
        { status: 400 }
      );
    }

    console.log("✅ Admin found:", admin.email);
    console.log("Token was valid until:", admin.resetTokenExpiry);

    // Hash new password
    console.log("🔒 Hashing new password...");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    admin.password = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;
    await admin.save();

    console.log("✅ Password updated successfully for:", admin.email);

    return NextResponse.json({
      success: true,
      message: "Password reset successfully! You can now login."
    });

  } catch (error) {
    console.error("❌ Reset password error:", error);
    console.error("Error details:", error.message);
    console.error("Stack trace:", error.stack);
    
    return NextResponse.json(
      { success: false, message: "Error resetting password: " + error.message },
      { status: 500 }
    );
  }
}
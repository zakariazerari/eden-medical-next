// app/api/admin/update/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();
    
    // Define Admin Schema
    const AdminSchema = new mongoose.Schema({
      email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: { 
        type: String, 
        required: true 
      },
    }, { timestamps: true });
    
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    
    const { action, email, currentPassword, newPassword } = await req.json();

    // Get the admin (assuming there's only one admin)
    const admin = await Admin.findOne();
    
    if (!admin) {
      return NextResponse.json({ 
        success: false, 
        error: "Admin not found. Please create admin first." 
      }, { status: 404 });
    }

    // ============ UPDATE EMAIL ============
    if (action === "updateEmail") {
      if (!email || !currentPassword) {
        return NextResponse.json({ 
          success: false, 
          error: "Email and current password are required" 
        }, { status: 400 });
      }

      // Verify current password
      const match = await bcrypt.compare(currentPassword, admin.password);
      
      if (!match) {
        return NextResponse.json({ 
          success: false, 
          error: "Current password is incorrect" 
        }, { status: 401 });
      }

      // Update email
      admin.email = email.toLowerCase().trim();
      await admin.save();
      
      console.log("✅ Email updated to:", email);

      return NextResponse.json({ 
        success: true, 
        message: "Email updated successfully",
        email: admin.email
      });
    }

    // ============ UPDATE PASSWORD ============
    if (action === "updatePassword") {
      if (!currentPassword || !newPassword) {
        return NextResponse.json({ 
          success: false, 
          error: "Current password and new password are required" 
        }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json({ 
          success: false, 
          error: "New password must be at least 6 characters" 
        }, { status: 400 });
      }

      // Verify current password
      const match = await bcrypt.compare(currentPassword, admin.password);
      
      if (!match) {
        return NextResponse.json({ 
          success: false, 
          error: "Current password is incorrect" 
        }, { status: 401 });
      }

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await admin.save();
      
      console.log("✅ Password updated successfully");

      return NextResponse.json({ 
        success: true, 
        message: "Password updated successfully" 
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: "Invalid action" 
    }, { status: 400 });

  } catch (error) {
    console.error("❌ Admin update error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update admin settings" 
    }, { status: 500 });
  }
}
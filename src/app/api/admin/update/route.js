import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import Admin from "@/models/Admin";

export async function POST(req) {
  try {
    await connectDB();
    const { action, email, currentPassword, newPassword } = await req.json();

    if (action === "updateEmail") {
      const admin = await Admin.findOne();
      
      if (!admin) {
        return NextResponse.json({ 
          success: false, 
          error: "Admin not found" 
        }, { status: 404 });
      }

      const match = await bcrypt.compare(currentPassword, admin.password);
      
      if (!match) {
        return NextResponse.json({ 
          success: false, 
          error: "Current password is incorrect" 
        }, { status: 401 });
      }

      admin.email = email;
      await admin.save();

      return NextResponse.json({ 
        success: true, 
        message: "Email updated successfully" 
      });
    }

    if (action === "updatePassword") {
      const admin = await Admin.findOne();
      
      if (!admin) {
        return NextResponse.json({ 
          success: false, 
          error: "Admin not found" 
        }, { status: 404 });
      }

      const match = await bcrypt.compare(currentPassword, admin.password);
      
      if (!match) {
        return NextResponse.json({ 
          success: false, 
          error: "Current password is incorrect" 
        }, { status: 401 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
      await admin.save();

      return NextResponse.json({ 
        success: true, 
        message: "Password updated successfully" 
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

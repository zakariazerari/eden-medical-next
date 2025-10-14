import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export async function verifyAdmin(email, password) {
  try {
    await connectDB();
    
    const AdminSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true },
      loginAttempts: { type: Number, default: 0 },
      lockUntil: { type: Date },
    }, { timestamps: true });
    
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    
    if (!admin) {
      console.log("❌ Admin not found:", email);
      return false;
    }

    // Check if account is locked
    if (admin.lockUntil && admin.lockUntil > Date.now()) {
      console.log("🔒 Account locked until:", admin.lockUntil);
      return false;
    }

    const match = await bcrypt.compare(password, admin.password);
    
    if (!match) {
      // Increment failed attempts
      admin.loginAttempts += 1;
      
      if (admin.loginAttempts >= 5) {
        admin.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
        console.log("🔒 Account locked after 5 failed attempts");
      }
      
      await admin.save();
      return false;
    }

    // Reset on successful login
    if (admin.loginAttempts > 0 || admin.lockUntil) {
      admin.loginAttempts = 0;
      admin.lockUntil = null;
      await admin.save();
    }

    return true;
  } catch (err) {
    console.error("❌ Error in verifyAdmin:", err);
    return false;
  }
}
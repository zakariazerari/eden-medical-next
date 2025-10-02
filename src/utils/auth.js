import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export async function verifyAdmin(email, password) {
  try {
    await connectDB();
    
    // Define schema directly here to avoid model caching issues
    const AdminSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
    }, { timestamps: true });
    
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    
    console.log("🔍 Looking for admin with email:", email);
    
    const admin = await Admin.findOne({ email });
    
    console.log("📄 Admin found:", admin ? "Yes" : "No");
    
    if (!admin) {
      console.log("❌ Admin not found");
      return false;
    }

    console.log("🔐 Comparing passwords...");
    const match = await bcrypt.compare(password, admin.password);
    console.log("✅ Password match:", match);
    
    return match;
  } catch (err) {
    console.error("❌ Error in verifyAdmin:", err);
    return false;
  }
}
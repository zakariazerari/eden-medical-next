import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";
import mongoose from "mongoose";

export async function verifyAdmin(email, password) {
  try {
    await connectDB();
    
    const AdminSchema = new mongoose.Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
    }, { timestamps: true });
    
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log("Admin not found with email:", email);
      return false;
    }

    const match = await bcrypt.compare(password, admin.password);
    return match;
  } catch (err) {
    console.error("Error in verifyAdmin:", err);
    return false;
  }
}
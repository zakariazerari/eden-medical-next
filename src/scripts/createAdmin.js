const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require('dotenv').config({ path: '.env.local' });

async function createAdmin() {
  try {
    // ✅ FIXED: Use environment variable
    const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env.local!");
    }
    
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
    }, { timestamps: true });
    
    const Admin = mongoose.model("Admin", AdminSchema);
    
    // Delete existing admins
    await Admin.deleteMany({});
    console.log("🗑️  Cleared existing admins");
    
    // Create new admin
    const hashedPassword = await bcrypt.hash("123456", 10);
    const admin = await Admin.create({
      email: "admin@eden.com",
      password: hashedPassword,
    });
    
    console.log("\n✅ Admin created successfully!");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password: 123456");
    console.log("🆔 ID:", admin._id);
    console.log("\n⚠️  IMPORTANT: Change password after first login!\n");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createAdmin();
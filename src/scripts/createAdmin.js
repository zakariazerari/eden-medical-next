const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require('dotenv').config({ path: '.env.local' });

async function createAdmins() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env.local!");
    }
    
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");
    
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
      resetToken: String,
      resetTokenExpiry: Date,
    }, { timestamps: true });
    
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    
    // ✅ DELETE OLD ADMINS
    await Admin.deleteMany({});
    console.log("🗑️  Cleared existing admins\n");
    
    // ✅ ADMIN 1 - Your main email
    const admin1Email = "zakariazerari042@gmail.com";
    const admin1Password = "azerty123";
    const admin1Hash = await bcrypt.hash(admin1Password, 10);
    
    const admin1 = await Admin.create({
      email: admin1Email,
      password: admin1Hash,
      resetToken: null,
      resetTokenExpiry: null,
    });
    
    console.log("✅ ADMIN 1 CREATED:");
    console.log("   📧 Email:", admin1.email);
    console.log("   🔑 Password:", admin1Password);
    console.log("   🆔 ID:", admin1._id);
    console.log("");
    
    // ✅ ADMIN 2 - Second email (change this!)
    const admin2Email = "edenmedtrans@gmail.com"; // ← CHANGE THIS TO YOUR SECOND EMAIL
    const admin2Password = "Admin123456";
    const admin2Hash = await bcrypt.hash(admin2Password, 10);
    
    const admin2 = await Admin.create({
      email: admin2Email,
      password: admin2Hash,
      resetToken: null,
      resetTokenExpiry: null,
    });
    
    console.log("✅ ADMIN 2 CREATED:");
    console.log("   📧 Email:", admin2.email);
    console.log("   🔑 Password:", admin2Password);
    console.log("   🆔 ID:", admin2._id);
    console.log("");
    
    console.log("═══════════════════════════════════");
    console.log("✅ SUCCESS - 2 ADMINS CREATED!");
    console.log("═══════════════════════════════════");
    console.log("\n🌐 Login at: https://edenmedtrans.com/admin/login");
    console.log("\n⚠️  IMPORTANT: Change passwords after first login!\n");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createAdmins();
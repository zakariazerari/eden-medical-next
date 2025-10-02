const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    // Force specific database name
    await mongoose.connect("mongodb+srv://Raja1949:Raja1949@cluster0.jwruy9i.mongodb.net/eden?retryWrites=true&w=majority");
    
    console.log("Connected to database:", mongoose.connection.name);
    
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
    }, { collection: 'admins' }); // Force collection name
    
    const Admin = mongoose.model("Admin", AdminSchema);
    
    await Admin.deleteMany({});
    
    const hashedPassword = await bcrypt.hash("123456", 10);
    const admin = await Admin.create({
      email: "admin@eden.com",
      password: hashedPassword,
    });
    
    console.log("✅ Admin created:", admin);
    console.log("📊 Total admins:", await Admin.countDocuments());
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createAdmin();
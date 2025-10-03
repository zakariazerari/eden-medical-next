const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function createAdmin() {
  try {
    await mongoose.connect("mongodb+srv://Raja1949:Raja1949@cluster0.jwruy9i.mongodb.net/eden?retryWrites=true&w=majority");
    
    const AdminSchema = new mongoose.Schema({
      email: String,
      password: String,
    }, { timestamps: true });
    
    const Admin = mongoose.model("Admin", AdminSchema);
    
    await Admin.deleteMany({});
    
    const hashedPassword = await bcrypt.hash("123456", 10);
    const admin = await Admin.create({
      email: "admin@eden.com",
      password: hashedPassword,
    });
    
    console.log("✅ Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Password: 123456");
    console.log("ID:", admin._id);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createAdmin();
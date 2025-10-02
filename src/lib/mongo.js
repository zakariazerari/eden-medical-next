import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "eden",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    isConnected = true;
    console.log("✅ MongoDB Connected to:", conn.connection.name);
    console.log("📊 Collections:", await conn.connection.db.listCollections().toArray());
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
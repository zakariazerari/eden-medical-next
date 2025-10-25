import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";           // ✅ CORRECT
import { verifyAdmin } from "@/utils/auth";        // ✅ CORRECT
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    // ✅ IMPORTANT: Connect to database first
    await connectDB();
    console.log("✅ Database connected");

    const { email, password, rememberMe } = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    console.log("🔐 Login attempt:", email);

    // Rate limiting
    const rateCheck = checkRateLimit(ip, 10, 300000);
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const isValid = await verifyAdmin(email, password);

    if (!isValid) {
      console.log("❌ Invalid credentials");
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("✅ Login successful:", email);

    const response = NextResponse.json({ success: true });
    
    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;
    
    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: maxAge,
      sameSite: "strict",
    });

    response.cookies.set("admin-email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: maxAge,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { success: false, error: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
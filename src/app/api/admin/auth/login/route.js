import { NextResponse } from "next/server";
import { verifyAdmin } from "@/utils/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting
    const rateCheck = checkRateLimit(ip, 10, 300000); // 10 attempts per 5 min
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const isValid = await verifyAdmin(email, password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

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

    // Log successful login
    console.log(`✅ Admin login: ${email} from ${ip}`);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
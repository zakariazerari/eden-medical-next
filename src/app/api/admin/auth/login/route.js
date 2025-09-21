import { NextResponse } from "next/server";
import { verifyAdmin } from "@/utils/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  const isValid = await verifyAdmin(email, password);

  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // ✅ إذا كان login صحيح نحط كوكي
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 ساعة
    sameSite: "strict",
  });

  return response;
}

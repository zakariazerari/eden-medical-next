// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin-auth")?.value;
  const { pathname } = request.nextUrl;

  // إذا المستخدم يحاول يدخل Dashboard وماعندوش الكوكي أو مش صالح
  if (
    pathname.startsWith("/admin/dashboard") &&
    token !== "true"
  ) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/dashboard"],
};
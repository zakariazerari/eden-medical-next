import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin-auth")?.value;
  const { pathname } = request.nextUrl;

  // Security headers
  const response = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")
    ? (token === "true" ? NextResponse.next() : NextResponse.redirect(new URL("/admin/login", request.url)))
    : NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
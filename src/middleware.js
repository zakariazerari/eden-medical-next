// middleware.js - ENHANCED VERSION
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("admin-auth")?.value;
  const { pathname } = request.nextUrl;

  // Check admin authentication
  let response;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.includes("/admin/reset-password") && !pathname.includes("/admin/forgot-password")) {
    if (token !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    response = NextResponse.next();
  } else {
    response = NextResponse.next();
  }

  // ========== SECURITY HEADERS ==========
  
  // ✅ Content Security Policy (CSP)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.anthropic.com https://www.google-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests"
  ];
  
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
  
  // ✅ Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // ✅ Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // ✅ XSS Protection (legacy but still useful)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // ✅ Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // ✅ Permissions Policy (restrict browser features)
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );
  
  // ✅ HSTS (HTTP Strict Transport Security) - PRODUCTION ONLY
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  
  // ✅ Remove server fingerprinting
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');
  
  // ✅ Cache Control for sensitive pages
  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|uploads|.*\\..*).+)",
  ],
};
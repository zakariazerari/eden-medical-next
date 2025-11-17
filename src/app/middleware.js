// middleware.js - ✅ CSRF Protection + Security Headers
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export function middleware(request) {
  const response = NextResponse.next()
  const { pathname, searchParams } = new URL(request.url)
  
  // ✅ 1. CSRF Token Generation for GET requests
  if (request.method === 'GET') {
    const existingToken = request.cookies.get('csrf-token')
    
    if (!existingToken) {
      const token = crypto.randomBytes(32).toString('hex')
      response.cookies.set('csrf-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      })
    }
  }
  
  // ✅ 2. CSRF Validation for State-Changing Requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const csrfCookie = request.cookies.get('csrf-token')?.value
    const csrfHeader = request.headers.get('x-csrf-token')
    const csrfBody = searchParams.get('csrf-token') // Fallback
    
    // Whitelist: Login doesn't need CSRF (uses other protection)
    const whitelistedPaths = [
      '/api/admin/auth/login',
      '/api/admin/auth/forgot-password',
      '/api/admin/auth/reset-password'
    ]
    
    const isWhitelisted = whitelistedPaths.some(path => pathname.startsWith(path))
    
    if (!isWhitelisted) {
      const csrfToken = csrfHeader || csrfBody
      
      if (!csrfCookie || !csrfToken || csrfCookie !== csrfToken) {
        console.warn('🚨 CSRF Attack Blocked:', {
          ip: request.headers.get('x-forwarded-for') || 'unknown',
          path: pathname,
          method: request.method
        })
        
        return NextResponse.json(
          { error: 'Invalid security token. Please refresh the page.' },
          { status: 403 }
        )
      }
    }
  }
  
  // ✅ 3. Security Headers (Defense in Depth)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // ✅ 4. Prevent clickjacking
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'")
  
  return response
}

// ✅ Apply to API routes and admin pages only
export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
}
// app/api/admin/auth/login/route.js - ✅ REPLACE YOUR CURRENT FILE WITH THIS
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { verifyAdmin } from "@/utils/auth";
import { checkRateLimit } from "@/lib/rateLimit";

// ✅ Track failed login attempts per IP + Email
const failedAttempts = new Map()
const blockedIPs = new Set()

function trackFailedAttempt(ip, email) {
  const key = `${ip}:${email}`
  const current = failedAttempts.get(key) || { count: 0, timestamp: Date.now() }
  
  // Reset if more than 15 minutes passed
  if (Date.now() - current.timestamp > 900000) {
    current.count = 0
  }
  
  current.count++
  current.timestamp = Date.now()
  
  failedAttempts.set(key, current)
  
  // ✅ Block after 5 failed attempts
  if (current.count >= 5) {
    blockedIPs.add(ip)
    console.error('🚨 IP BLOCKED due to failed login attempts:', ip, email)
    return true
  }
  
  // ✅ Progressive delays
  if (current.count > 2) {
    const delay = Math.min(current.count * 1000, 5000) // Max 5 seconds
    return delay
  }
  
  return false
}

function clearFailedAttempts(ip, email) {
  const key = `${ip}:${email}`
  failedAttempts.delete(key)
}

export async function POST(request) {
  try {
    await connectDB()
    
    const { email, password, rememberMe } = await request.json()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 'unknown'
    
    // ✅ 1. Check if IP is blocked
    if (blockedIPs.has(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many failed attempts. Please try again later." },
        { status: 429 }
      )
    }
    
    // ✅ 2. Rate limiting (10 requests per 5 minutes)
    const rateCheck = checkRateLimit(ip, 10, 300000)
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }
    
    // ✅ 3. Validate email format
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      )
    }
    
    const cleanEmail = email.toLowerCase().trim()
    
    // ✅ 4. Check failed attempts and apply delay
    const attemptResult = trackFailedAttempt(ip, cleanEmail)
    
    if (attemptResult === true) {
      return NextResponse.json(
        { success: false, error: "Account temporarily locked. Please try again in 15 minutes." },
        { status: 429 }
      )
    }
    
    if (typeof attemptResult === 'number') {
      // Progressive delay before checking password
      await new Promise(resolve => setTimeout(resolve, attemptResult))
    }
    
    // ✅ 5. Verify credentials
    const isValid = await verifyAdmin(cleanEmail, password)

    if (!isValid) {
      console.warn('🔐 Failed login attempt:', {
        ip,
        email: cleanEmail,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // ✅ 6. Clear failed attempts on successful login
    clearFailedAttempts(ip, cleanEmail)
    
    console.log("✅ Successful login:", cleanEmail)

    const response = NextResponse.json({ success: true })
    
    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24
    
    // ✅ 7. Set secure cookies
    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: maxAge,
      sameSite: "strict",
    })

    response.cookies.set("admin-email", cleanEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: maxAge,
      sameSite: "strict",
    })

    return response
    
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    )
  }
}
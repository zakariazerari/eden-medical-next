// utils/xssProtection.js - ✅ COMPREHENSIVE XSS PROTECTION
import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS
 * Use this for any user-generated content that will be displayed as HTML
 */
export function sanitizeHTML(dirty, options = {}) {
  const config = {
    ALLOWED_TAGS: options.allowedTags || ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: options.allowedAttr || [],
    KEEP_CONTENT: true,
    ...options
  }
  
  return DOMPurify.sanitize(dirty, config)
}

/**
 * Strip all HTML tags (for plain text only)
 */
export function stripHTML(html) {
  if (typeof window === 'undefined') {
    // Server-side: Simple regex-based stripping
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim()
  }
  
  // Client-side: Use DOM API
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ''
}

/**
 * Escape HTML entities
 */
export function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  
  return text.replace(/[&<>"'/]/g, char => map[char])
}

/**
 * Unescape HTML entities
 */
export function unescapeHTML(text) {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
  }
  
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;/g, entity => map[entity])
}

/**
 * Sanitize URL to prevent javascript: protocol
 */
export function sanitizeURL(url) {
  if (!url) return ''
  
  const urlString = url.toString().trim()
  
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
  
  for (const protocol of dangerousProtocols) {
    if (urlString.toLowerCase().startsWith(protocol)) {
      console.warn('🚨 Dangerous URL blocked:', urlString)
      return ''
    }
  }
  
  // Only allow http, https, mailto, tel
  if (!/^(https?|mailto|tel):/i.test(urlString) && !urlString.startsWith('/')) {
    return ''
  }
  
  return urlString
}

/**
 * Sanitize user input for display (React-safe)
 */
export function sanitizeForDisplay(input) {
  if (!input) return ''
  
  // Convert to string
  const str = String(input)
  
  // Remove null bytes
  const cleaned = str.replace(/\0/g, '')
  
  // Escape HTML
  return escapeHTML(cleaned)
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString)
    
    // Recursively sanitize all string values
    function sanitizeObject(obj) {
      if (typeof obj === 'string') {
        return escapeHTML(obj)
      }
      
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject)
      }
      
      if (typeof obj === 'object' && obj !== null) {
        const sanitized = {}
        for (const [key, value] of Object.entries(obj)) {
          // Sanitize keys too
          const sanitizedKey = escapeHTML(key)
          sanitized[sanitizedKey] = sanitizeObject(value)
        }
        return sanitized
      }
      
      return obj
    }
    
    return {
      valid: true,
      data: sanitizeObject(parsed)
    }
  } catch (error) {
    return {
      valid: false,
      error: 'Invalid JSON'
    }
  }
}

/**
 * Content Security Policy helper
 */
export function getCSPHeader() {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.anthropic.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  }
}
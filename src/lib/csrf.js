// lib/csrf.js - ✅ CSRF Helper Functions
"use client"
import { useEffect, useState } from 'react'

/**
 * Get CSRF token from cookie
 */
export function getCsrfToken() {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const csrfCookie = cookies.find(c => c.trim().startsWith('csrf-token='))
  
  return csrfCookie ? csrfCookie.split('=')[1] : null
}

/**
 * React Hook for CSRF token
 */
export function useCsrfToken() {
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    setToken(getCsrfToken())
  }, [])
  
  return token
}

/**
 * Add CSRF token to fetch headers
 */
export function withCsrf(options = {}) {
  const token = getCsrfToken()
  
  return {
    ...options,
    headers: {
      ...options.headers,
      'x-csrf-token': token || '',
    },
  }
}

/**
 * Fetch with automatic CSRF token
 */
export async function secureFetch(url, options = {}) {
  const token = getCsrfToken()
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-csrf-token': token || '',
    },
  })
}
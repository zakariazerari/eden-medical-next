// utils/secureValidation.js - ✅ COMPREHENSIVE INPUT VALIDATION
import validator from 'validator'

/**
 * Sanitize MongoDB query to prevent injection
 */
export function sanitizeMongoQuery(query) {
  if (typeof query !== 'object' || query === null) {
    return query
  }
  
  const sanitized = {}
  
  for (const [key, value] of Object.entries(query)) {
    // ✅ Block MongoDB operators
    if (key.startsWith('$')) {
      console.warn('🚨 MongoDB injection attempt blocked:', key)
      continue
    }
    
    // ✅ Recursively sanitize nested objects
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeMongoQuery(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

/**
 * Validate and sanitize email (Enhanced)
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }
  
  const trimmed = email.trim()
  
  // ✅ Block email injection attempts
  if (trimmed.includes('<') || trimmed.includes('>') || trimmed.includes('%')) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  if (!validator.isEmail(trimmed)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email too long' }
  }
  
  // ✅ Normalize email
  const normalized = validator.normalizeEmail(trimmed, {
    gmail_remove_dots: false,
    gmail_remove_subaddress: false
  })
  
  return { valid: true, value: normalized || trimmed.toLowerCase() }
}

/**
 * Validate and sanitize phone (Enhanced)
 */
export function validatePhone(phone) {
  if (!phone) return { valid: true, value: '' }
  
  // ✅ Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // ✅ Block suspicious patterns
  if (/^0+$/.test(cleaned) || /^1+$/.test(cleaned)) {
    return { valid: false, error: 'Invalid phone number' }
  }
  
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { valid: false, error: 'Phone number must be 10-15 digits' }
  }
  
  return { valid: true, value: cleaned }
}

/**
 * Sanitize string with XSS protection (Enhanced)
 */
export function sanitizeString(str, maxLength = 500) {
  if (!str || typeof str !== 'string') {
    return { valid: false, error: 'Invalid input' }
  }
  
  const trimmed = str.trim()
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Field cannot be empty' }
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `Maximum ${maxLength} characters allowed` }
  }
  
  // ✅ Block script tags and dangerous patterns
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onerror, etc.
    /<\s*embed/gi,
    /<\s*object/gi,
  ]
  
  let cleaned = trimmed
  for (const pattern of dangerousPatterns) {
    if (pattern.test(cleaned)) {
      console.warn('🚨 XSS attempt blocked:', cleaned.substring(0, 50))
      cleaned = cleaned.replace(pattern, '')
    }
  }
  
  // ✅ HTML escape for display
  const escaped = validator.escape(cleaned)
  
  return { valid: true, value: escaped, raw: cleaned }
}

/**
 * Validate date (Enhanced)
 */
export function validateDate(dateString) {
  if (!dateString) {
    return { valid: false, error: 'Date is required' }
  }
  
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' }
  }
  
  // ✅ Check for reasonable date range
  const minDate = new Date('1900-01-01')
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 2)
  
  if (date < minDate || date > maxDate) {
    return { valid: false, error: 'Date out of valid range' }
  }
  
  if (date < today) {
    return { valid: false, error: 'Date cannot be in the past' }
  }
  
  return { valid: true, value: dateString }
}

/**
 * Validate password (Enhanced)
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' }
  }
  
  const minLength = 8
  const errors = []
  
  if (password.length < minLength) {
    errors.push(`Minimum ${minLength} characters required`)
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Must contain number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Must contain special character')
  }
  
  // ✅ Block common passwords
  const commonPasswords = [
    'password', 'password123', 'admin', 'admin123', '12345678',
    'qwerty', 'abc123', 'letmein', 'welcome', 'monkey'
  ]
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password is too common')
  }
  
  if (errors.length > 0) {
    return { valid: false, error: errors.join(', ') }
  }
  
  return { valid: true, value: password }
}

/**
 * Validate booking data (Complete validation)
 */
export function validateBookingData(data) {
  const errors = []
  
  // Service Type
  const validServiceTypes = ['Emergency', 'Non-Emergency']
  if (!validServiceTypes.includes(data.serviceType)) {
    errors.push('Invalid service type')
  }
  
  // Mobility
  const validMobility = ['Wheelchair', 'Stretcher', 'Sedan']
  if (!validMobility.includes(data.mobility)) {
    errors.push('Invalid mobility option')
  }
  
  // Date validation
  const dateValidation = validateDate(data.date)
  if (!dateValidation.valid) {
    errors.push(dateValidation.error)
  }
  
  // Time validation
  if (!data.time || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
    errors.push('Invalid time format')
  }
  
  // Email validation
  const emailValidation = validateEmail(data.email)
  if (!emailValidation.valid) {
    errors.push(emailValidation.error)
  }
  
  // Phone validation
  const phoneValidation = validatePhone(data.phone)
  if (!phoneValidation.valid) {
    errors.push(phoneValidation.error)
  }
  
  // Name validation
  const nameValidation = sanitizeString(data.patientName, 100)
  if (!nameValidation.valid) {
    errors.push('Invalid patient name')
  }
  
  // Location validation
  const pickupValidation = sanitizeString(data.pickup, 200)
  const destValidation = sanitizeString(data.destination, 200)
  
  if (!pickupValidation.valid || !destValidation.valid) {
    errors.push('Invalid location data')
  }
  
  // Payment method
  const validPayment = ['Cash', 'Credit Card', 'Zelle', 'Insurance']
  if (!validPayment.includes(data.paymentMethod)) {
    errors.push('Invalid payment method')
  }
  
  return {
    valid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? {
      ...data,
      email: emailValidation.value,
      phone: phoneValidation.value,
      patientName: nameValidation.value,
      pickup: pickupValidation.value,
      destination: destValidation.value,
    } : null
  }
}
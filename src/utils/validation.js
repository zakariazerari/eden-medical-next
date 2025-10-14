import validator from 'validator';

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim();
  
  if (!validator.isEmail(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email too long' };
  }
  
  return { valid: true, value: trimmed.toLowerCase() };
}

export function validatePhone(phone) {
  if (!phone) return { valid: true, value: '' }; // Optional field
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { valid: false, error: 'Invalid phone number' };
  }
  
  return { valid: true, value: cleaned };
}

export function sanitizeString(str, maxLength = 500) {
  if (!str || typeof str !== 'string') {
    return { valid: false, error: 'Invalid input' };
  }
  
  const trimmed = str.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Field cannot be empty' };
  }
  
  if (trimmed.length > maxLength) {
    return { valid: false, error: `Maximum ${maxLength} characters allowed` };
  }
  
  // Remove dangerous characters
  const sanitized = validator.escape(trimmed);
  
  return { valid: true, value: sanitized };
}

export function validateDate(dateString) {
  if (!dateString) {
    return { valid: false, error: 'Date is required' };
  }
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date' };
  }
  
  if (date < today) {
    return { valid: false, error: 'Date cannot be in the past' };
  }
  
  // Max 1 year in future
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  
  if (date > maxDate) {
    return { valid: false, error: 'Date too far in future' };
  }
  
  return { valid: true, value: dateString };
}

export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  
  const minLength = 8;
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Minimum ${minLength} characters required`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Must contain number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Must contain special character');
  }
  
  if (errors.length > 0) {
    return { valid: false, error: errors.join(', ') };
  }
  
  return { valid: true, value: password };
}
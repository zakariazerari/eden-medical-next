// utils/passwordPolicy.js - ENHANCED VERSION
export function validatePassword(password) {
  const minLength = 12; // ✅ Changed from 6 to 12
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  
  if (!password || password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }
  if (!hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter (A-Z)");
  }
  if (!hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter (a-z)");
  }
  if (!hasNumbers) {
    errors.push("Password must contain at least one number (0-9)");
  }
  if (!hasSpecialChar) {
    errors.push("Password must contain at least one special character (!@#$%^&*...)");
  }

  // ✅ NEW: Check for common/weak passwords
  const commonPasswords = [
    'password', 'password123', 'admin123', '123456789', 
    'qwerty123', 'welcome123', 'passw0rd', 'admin@123',
    '12345678', 'abc123456', 'Password1', 'Admin@123'
  ];
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common.toLowerCase()))) {
    errors.push("Password is too common. Please choose a stronger password");
  }

  // ✅ NEW: Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    errors.push("Password cannot have 3 or more repeated characters");
  }

  // ✅ NEW: Check for sequential characters
  const sequences = ['012', '123', '234', '345', '456', '567', '678', '789', 'abc', 'bcd', 'cde', 'def'];
  if (sequences.some(seq => password.toLowerCase().includes(seq))) {
    errors.push("Password cannot contain sequential characters (123, abc, etc.)");
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
}

// ✅ NEW: Calculate password strength
function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 12) strength += 20;
  if (password.length >= 16) strength += 10;
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/\d/.test(password)) strength += 15;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
  
  // Bonus for variety
  const uniqueChars = new Set(password).size;
  if (uniqueChars > 10) strength += 10;
  
  return Math.min(strength, 100);
}

// ✅ NEW: Get password strength label
export function getPasswordStrengthLabel(strength) {
  if (strength >= 80) return { label: 'Very Strong', color: 'green' };
  if (strength >= 60) return { label: 'Strong', color: 'blue' };
  if (strength >= 40) return { label: 'Medium', color: 'yellow' };
  return { label: 'Weak', color: 'red' };
}

// ✅ NEW: Generate strong password suggestion
export function generateStrongPassword(length = 16) {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + special;
  let password = '';
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill remaining characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}
const rateLimit = new Map();

export function checkRateLimit(identifier, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const userAttempts = rateLimit.get(identifier) || [];
  
  // Remove old attempts
  const recentAttempts = userAttempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  recentAttempts.push(now);
  rateLimit.set(identifier, recentAttempts);
  
  return { allowed: true, remaining: limit - recentAttempts.length };
}
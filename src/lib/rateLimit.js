// lib/rateLimit.js - ENHANCED VERSION
// ✅ Install: npm install lru-cache

class SimpleCache {
  constructor(options = {}) {
    this.cache = new Map();
    this.maxSize = options.max || 500;
    this.ttl = options.ttl || 60000; // 1 minute
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return undefined;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value;
  }

  set(key, value) {
    // Clean up expired entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const now = Date.now();
      for (const [k, v] of this.cache.entries()) {
        if (now > v.expiry) {
          this.cache.delete(k);
        }
      }
      
      // If still full, remove oldest
      if (this.cache.size >= this.maxSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

// Create cache instance
const rateLimitCache = new SimpleCache({
  max: 500,
  ttl: 60000, // 1 minute
});

/**
 * Enhanced rate limiting with multiple features
 * @param {string} identifier - IP address or user identifier
 * @param {number} limit - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @param {object} options - Additional options
 * @returns {object} - { allowed, remaining, resetTime, retryAfter }
 */
export function checkRateLimit(identifier, limit = 5, windowMs = 60000, options = {}) {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  
  // Get or create record
  let record = rateLimitCache.get(key);
  
  if (!record || now > record.resetTime) {
    // Create new record
    record = {
      count: 0,
      resetTime: now + windowMs,
      firstRequest: now
    };
  }
  
  // Increment count
  record.count++;
  
  // Save record
  rateLimitCache.set(key, record);
  
  // Check if limit exceeded
  if (record.count > limit) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000); // seconds
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter,
      message: `Too many requests. Please try again in ${retryAfter} seconds.`
    };
  }
  
  return {
    allowed: true,
    remaining: Math.max(0, limit - record.count),
    resetTime: record.resetTime,
    retryAfter: 0
  };
}

/**
 * Sliding window rate limiter (more accurate)
 */
export function checkSlidingWindowRateLimit(identifier, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const key = `sliding:${identifier}`;
  
  let timestamps = rateLimitCache.get(key) || [];
  
  // Remove old timestamps outside window
  timestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
  
  // Add current timestamp
  timestamps.push(now);
  
  // Save updated timestamps
  rateLimitCache.set(key, timestamps);
  
  if (timestamps.length > limit) {
    const oldestTimestamp = timestamps[0];
    const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      message: `Too many requests. Please try again in ${retryAfter} seconds.`
    };
  }
  
  return {
    allowed: true,
    remaining: limit - timestamps.length,
    retryAfter: 0
  };
}

/**
 * Adaptive rate limiting (stricter for repeated violations)
 */
export function checkAdaptiveRateLimit(identifier, baseLimit = 5, windowMs = 60000) {
  const violationKey = `violations:${identifier}`;
  const violations = rateLimitCache.get(violationKey) || 0;
  
  // Reduce limit based on violations
  const adjustedLimit = Math.max(1, baseLimit - violations);
  
  const result = checkRateLimit(identifier, adjustedLimit, windowMs);
  
  if (!result.allowed) {
    // Increment violations
    rateLimitCache.set(violationKey, violations + 1);
  } else if (violations > 0) {
    // Gradually reduce violations on successful requests
    rateLimitCache.set(violationKey, Math.max(0, violations - 0.1));
  }
  
  return result;
}

/**
 * Reset rate limit for a specific identifier
 */
export function resetRateLimit(identifier) {
  const keys = [`ratelimit:${identifier}`, `sliding:${identifier}`, `violations:${identifier}`];
  keys.forEach(key => rateLimitCache.delete(key));
}

/**
 * Clear all rate limit data
 */
export function clearAllRateLimits() {
  rateLimitCache.clear();
}

/**
 * Get rate limit status without incrementing
 */
export function getRateLimitStatus(identifier) {
  const key = `ratelimit:${identifier}`;
  const record = rateLimitCache.get(key);
  
  if (!record) {
    return {
      requests: 0,
      remaining: 5,
      resetTime: null
    };
  }
  
  return {
    requests: record.count,
    remaining: Math.max(0, 5 - record.count),
    resetTime: record.resetTime
  };
}

// ✅ Export for API routes
export default checkRateLimit;
// lib/logger.js - Error Logging System

/**
 * Log errors with context
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (route, user, etc.)
 */
export function logError(error, context = {}) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    ...context,
  };
  
  // Development: Console log with colors
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ ==================== ERROR ====================');
    console.error('🕐 Time:', errorLog.timestamp);
    console.error('📍 Context:', context);
    console.error('💬 Message:', error.message);
    console.error('📚 Stack:', error.stack);
    console.error('================================================\n');
  }
  
  // Production: Send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry, LogRocket, or your monitoring service
    // Example: Sentry.captureException(error, { contexts: { custom: context } });
  }
  
  return errorLog;
}

/**
 * Log info messages
 */
export function logInfo(message, data = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.log('ℹ️', message, data);
  }
}

/**
 * Log warnings
 */
export function logWarning(message, data = {}) {
  console.warn('⚠️', message, data);
}

/**
 * Log success messages
 */
export function logSuccess(message, data = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.log('✅', message, data);
  }
}

export default logError;
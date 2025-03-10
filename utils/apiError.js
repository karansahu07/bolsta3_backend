class APIError extends Error {
  /**
   * Custom error class for API errors.
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code.
   * @param {boolean} [isOperational=true] - Whether the error is expected (e.g., validation errors).
   */
  constructor(message, statusCode, isOperational = true) {
    super(message);

    this.name = "APIError";
    this.statusCode = statusCode || 400;
    this.isOperational = isOperational;

    if (process.env.NODE_ENV !== "production") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = null; // Omit stack trace in production
    }
  }
}

module.exports = APIError;

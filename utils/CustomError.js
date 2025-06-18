class CustomError extends Error {
  constructor(message, statusCode, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.details = details;

    // Maintains proper stack trace (only needed for V8/Chrome)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default CustomError;

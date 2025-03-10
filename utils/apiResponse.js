class APIResponse {
  constructor(message, statusCode, data = null, meta = null) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.meta = meta; // For pagination or additional details
  }
}

module.exports = APIResponse;

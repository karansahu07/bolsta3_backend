const APIResponse = require("../utils/apiResponse");
const httpStatus = require("../config/httpStatus");

const sendResponseMiddleware = (req, res, next) => {
  const originalSend = res.send;
  /**
   * Custom send method for standardized responses.
   *
   * @param {number} statusCode - The HTTP status code.
   * @param {string} [msg] - The message to send.
   * @param {Object} [data] - The data to send.
   */
  res.send = function (statusCode, data, msg) {
    if (typeof statusCode !== "number") {
      return originalSend.call(this, statusCode);
    }

    const httpRes = httpStatus[`${statusCode}`];
    const resp = {
      code: statusCode,
      msg: msg ?? httpRes.message,
    };
    if (data) {
      resp.data = data ?? [];
    }

    this.status(statusCode).json(resp);
  };

  next();
};


/**
 * @typedef {import("express").Response & { apiResponse: (statusCode: number, message?: string, data?: object, meta?: object) => void }} CustomResponse
 */

/**
 * Middleware to add `res.apiResponse()` for standardized responses.
 * @param {import("express").Request} req
 * @param {CustomResponse} res
 * @param {import("express").NextFunction} next
 */
const apiResponseMiddleware = (req, res, next) => {
  /**
   * Standardized API response handler.
   *
   * @param {number} statusCode - HTTP status code.
   * @param {string} [message] - Optional response message.
   * @param {Object} [data] - Response data.
   * @param {Object} [meta] - Additional metadata (e.g., pagination).
   */
  res.apiResponse = (statusCode, message = null, data = {}, meta = null) => {
    if (typeof statusCode !== "number") {
      throw new Error("Invalid statusCode: Must be a number.");
    }

    const httpRes = httpStatus[`${statusCode}`];
    const responseMessage = message ?? httpRes.message;
    const response = new APIResponse(responseMessage, statusCode, data, meta);
    res.status(statusCode).json(response);
  };

  next();
};

module.exports = { apiResponseMiddleware, apiResponseMiddleware };

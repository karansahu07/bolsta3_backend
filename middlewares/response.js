const APIResponse = require("../utils/apiResponse");
const httpStatus = require("../config/httpStatus");
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

module.exports = apiResponseMiddleware

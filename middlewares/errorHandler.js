const constants = require("../config/constants");
const {ApiError} = require("../utils"); // Import the ApiError class

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message || "An error occurred";

  // Handle ApiError explicitly
  if (err instanceof ApiError) {
    error.statusCode = err.statusCode;
    error.isOperational = err.isOperational;
  }

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    error.statusCode = 400;
    error.message = Object.values(err.errors).map((e) => e.message).join(". ");
    error.isOperational = true;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = "Duplicate field value entered";
    error.isOperational = true;
  }

  if (err.code) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        error.statusCode = 400;
        error.message = "Duplicate entry. The value already exists.";
        error.isOperational = true;
        break;

      case "ER_BAD_NULL_ERROR":
        error.statusCode = 400;
        error.message = "Missing required fields.";
        error.isOperational = true;
        break;

      case "ER_NO_REFERENCED_ROW_2":
        error.statusCode = 400;
        error.message = "Foreign key constraint failed.";
        error.isOperational = true;
        break;

      case "ER_DATA_TOO_LONG":
        error.statusCode = 400;
        error.message = "Data exceeds the maximum allowed length.";
        error.isOperational = true;
        break;

      case "ER_PARSE_ERROR":
        error.statusCode = 400;
        error.message = "Invalid SQL syntax.";
        error.isOperational = false;
        break;

      case "ER_ACCESS_DENIED_ERROR":
        error.statusCode = 403;
        error.message = "Database access denied.";
        error.isOperational = false;
        break;

      case "ER_LOCK_WAIT_TIMEOUT":
        error.statusCode = 408;
        error.message = "Database lock wait timeout exceeded.";
        error.isOperational = false;
        break;

      case "PROTOCOL_CONNECTION_LOST":
      case "ECONNREFUSED":
      case "ER_CON_COUNT_ERROR":
        error.statusCode = 503;
        error.message = "Database connection error. Please try again.";
        error.isOperational = false;
        break;
    }
  }

  // Handle Invalid ObjectId Errors (e.g., when querying by an invalid MongoDB ID)
  if (err.name === "CastError") {
    error.statusCode = 400;
    error.message = "Invalid resource ID";
    error.isOperational = true;
  }

  // Handle Syntax Errors (e.g., Invalid JSON body)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    error.statusCode = 400;
    error.message = "Invalid JSON payload";
    error.isOperational = true;
  }

  // Handle Uncaught Errors (set generic error message)
  if (!error.statusCode) {
    error.statusCode = 500;
    error.message = constants.INTERNAL_SERVER_ERROR;
    error.isOperational = false;
  }

  if(error.name==="JsonWebTokenError"){
    error.statusCode = 401
    error.message = constants.UNAUTHORISED_ACCESS
    error.isOperational = true
  }

  if(error.name==="TokenExpiredError"){
    error.statusCode = 401
    error.message = constants.UNAUTHORISED_ACCESS
    error.isOperational = true
  }

  if(error.name==="TypeError"){
    error.statusCode = 500
    error.message = "Type Error occured"
    error.isOperational = false
  }

  // Log Errors Based on Severity
  if (process.env.NODE_ENV === "production") {
    if (error.isOperational) {
      // utils.logger.warn(helper.formatter.toErrString(error, req)); // Log operational errors as warnings
    } else {
      // utils.logger.error(helper.formatter.toErrString(error, req)); // Log unexpected errors as errors
    }
  } else {
    console.error(error); // Log full error in development
  }
  // Send the Response (Use res.apiResponse if available)
  if (res.apiResponse) {
    return res.apiResponse(error.statusCode, error.message,null, process.env.NODE_ENV === "production" ? null : err.stack);
  }

  // Default Response Fallback
  res.status(error.statusCode).json({
    success: false,
    msg: error.isOperational ? error.message : constants.INTERNAL_SERVER_ERROR,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

module.exports = errorHandler;

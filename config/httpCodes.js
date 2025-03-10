module.exports = {
  CONTINUE: {
    message: "Continue with the request",
    code: 100,
  },
  SWITCHING_PROTOCOLS: {
    message: "Switching to the protocol requested",
    code: 101,
  },
  PROCESSING: {
    message: "Request is being processed",
    code: 102,
  },
  EARLY_HINTS: {
    message: "Preliminary information",
    code: 103,
  },
  OK: {
    message: "Request succeeded",
    code: 200,
  },
  CREATED: {
    message: "Resource created",
    code: 201,
  },
  ACCEPTED: {
    message: "Request accepted but not yet processed",
    code: 202,
  },
  NON_AUTHORITATIVE_INFORMATION: {
    message: "Non-authoritative information",
    code: 203,
  },
  NO_CONTENT: {
    message: "No content to send for this request",
    code: 204,
  },
  RESET_CONTENT: {
    message: "Reset the content that sent this request",
    code: 205,
  },
  PARTIAL_CONTENT: {
    message: "Partial content sent",
    code: 206,
  },
  MULTI_STATUS: {
    message: "Multiple status messages",
    code: 207,
  },
  MULTIPLE_CHOICES: {
    message: "Multiple options for the resource",
    code: 300,
  },
  MOVED_PERMANENTLY: {
    message: "Resource moved permanently",
    code: 301,
  },
  FOUND: {
    message: "Resource found at another location",
    code: 302,
  },
  SEE_OTHER: {
    message: "See another resource",
    code: 303,
  },
  NOT_MODIFIED: {
    message: "Resource not modified",
    code: 304,
  },
  USE_PROXY: {
    message: "Use proxy to access resource",
    code: 305,
  },
  TEMPORARY_REDIRECT: {
    message: "Temporary redirection",
    code: 307,
  },
  PERMANENT_REDIRECT: {
    message: "Permanent redirection",
    code: 308,
  },
  BAD_REQUEST: {
    message: "Bad request syntax or unsupported method",
    code: 400,
  },
  UNAUTHORIZED: {
    message: "No permission to access resource",
    code: 401,
  },
  PAYMENT_REQUIRED: {
    message: "Payment required to access resource",
    code: 402,
  },
  FORBIDDEN: {
    message: "Access to this route is forbidden",
    code: 403,
  },
  NOT_FOUND: {
    message: "Resource not found",
    code: 404,
  },
  METHOD_NOT_ALLOWED: {
    message: "HTTP method not allowed",
    code: 405,
  },
  NOT_ACCEPTABLE: {
    message: "Resource not acceptable according to the Accept headers",
    code: 406,
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    message: "Authentication with the proxy is required",
    code: 407,
  },
  REQUEST_TIMEOUT: {
    message: "Server timed out waiting for the request",
    code: 408,
  },
  CONFLICT: {
    message: "Request conflict",
    code: 409,
  },
  GONE: {
    message: "Resource is gone",
    code: 410,
  },
  LENGTH_REQUIRED: {
    message: "Content-Length header required",
    code: 411,
  },
  PRECONDITION_FAILED: {
    message: "Precondition failed",
    code: 412,
  },
  PAYLOAD_TOO_LARGE: {
    message: "Payload too large",
    code: 413,
  },
  URI_TOO_LONG: {
    message: "URI too long",
    code: 414,
  },
  UNSUPPORTED_MEDIA_TYPE: {
    message: "Unsupported media type",
    code: 415,
  },
  RANGE_NOT_SATISFIABLE: {
    message: "Range not satisfiable",
    code: 416,
  },
  EXPECTATION_FAILED: {
    message: "Expectation failed",
    code: 417,
  },
  IM_A_TEAPOT: {
    message: "I'm a teapot",
    code: 418,
  },
  INSUFFICIENT_SPACE_ON_RESOURCE: {
    message: "Insufficient space on resource",
    code: 419,
  },
  METHOD_FAILURE: {
    message: "Method failure",
    code: 420,
  },
  MISDIRECTED_REQUEST: {
    message: "Misdirected request",
    code: 421,
  },
  UNPROCESSABLE_ENTITY: {
    message: "Unprocessable entity",
    code: 422,
  },
  LOCKED: {
    message: "Resource is locked",
    code: 423,
  },
  FAILED_DEPENDENCY: {
    message: "Failed dependency",
    code: 424,
  },
  UPGRADE_REQUIRED: {
    message: "Upgrade required",
    code: 426,
  },
  PRECONDITION_REQUIRED: {
    message: "Precondition required",
    code: 428,
  },
  TOO_MANY_REQUESTS: {
    message: "Too many requests",
    code: 429,
  },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    message: "Request header fields too large",
    code: 431,
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    message: "Unavailable for legal reasons",
    code: 451,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error",
    code: 500,
  },
  NOT_IMPLEMENTED: {
    message: "Not implemented",
    code: 501,
  },
  BAD_GATEWAY: {
    message: "Bad gateway",
    code: 502,
  },
  SERVICE_UNAVAILABLE: {
    message: "Service unavailable",
    code: 503,
  },
  GATEWAY_TIMEOUT: {
    message: "Gateway timeout",
    code: 504,
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    message: "HTTP version not supported",
    code: 505,
  },
  INSUFFICIENT_STORAGE: {
    message: "Insufficient storage",
    code: 507,
  },
  NETWORK_AUTHENTICATION_REQUIRED: {
    message: "Network authentication required",
    code: 511,
  },
};

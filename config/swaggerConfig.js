const path = require("path");
module.exports = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SafeDispatchLogistics",
      version: "1.0.1",
      description: "API Documentation for SafeDispatchLogistics API",
    },
    servers: [
      {
        url: "https://backend.safedispatchlogistics.com",
        description: "Backend Server",
      },
    ],
    paths: {},
  },
  apis: [path.join(__dirname, "..", "/app/routes/*.js")], // Path to the API docs
};

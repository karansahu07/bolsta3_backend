const config = require("./config");
const express = require("express");
const server = express();
const db = config.db;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const utils = require("./utils");
// require("./serverStats")

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const middlewares = require("./middlewares");
const router = require("./app/routes");
const PORT = process.env.PORT || 8000;
const swaggerSpec = swaggerJsdoc(config.swagger);

server.use(cookieParser());
server.use(express.json({ limit: "1mb" }));
server.use(express.urlencoded({ extended: true }));
server.use(cors(config.cors));
server.use(middlewares.response.apiResponseMiddleware);
server.use(middlewares.reqLogger);

// server.use(middlewares.capitalizer);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//static for public files
server.use(express.static("public/"));
server.use('/api', router);
server.use(middlewares.errorHandler);

server.listen(PORT, () => {
  console.log(
    `server started on port ${PORT} at ${new Date().toDateString()} ${new Date().toTimeString()}`
  );
});

// db.init()
//   .then((result) => {
//     console.log("Connected to Db");

//     server.listen(PORT, () => {
//       console.log(
//         `server started on port ${PORT} at ${new Date().toDateString()} ${new Date().toTimeString()}`
//       );
//     });
//   })
  // .catch((err) => {
  //   console.log(err);
  // });

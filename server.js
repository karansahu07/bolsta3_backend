const config = require("./config");
const express = require("express");
const server = express();
const db = config.db;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const utils = require("./utils");
// require("./serverStats")
// const superAdminRoutes = require("./app/routes/superadminroute");


const app = express();

const middlewares = require("./middlewares");
const router = require("./app/routes");
const PORT = process.env.PORT || 8000;


server.use(cookieParser());
server.use(express.json({ limit: "1mb" }));
server.use(express.urlencoded({ extended: true }));
server.use(cors(config.cors));
server.use(middlewares.response.apiResponseMiddleware);
server.use(middlewares.reqLogger);


//static for public files
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public/"));
server.use('/api', router);
server.use(middlewares.errorHandler);


// Routes
// app.use("/api/superadmin", superAdminRoutes);

// server.listen(PORT, () => {
//   console.log(
//     `server started on port ${PORT} at ${new Date().toDateString()} ${new Date().toTimeString()}`
//   );
// });

db.testdbconn().then(() => {
  console.log("Connected to Db");

  server.listen(PORT, () => {
    console.log(
      `server started on port ${PORT} at ${new Date().toDateString()} ${new Date().toTimeString()}`
    );
  });
})
  .catch((err) => {

    console.log(err);

  })


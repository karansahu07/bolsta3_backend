const express = require("express");
const cors = require("cors");
const middlewares = require("./middlewares");
const router = require("./app/routes");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.cors));
app.use(middlewares.reqLogger);
app.use(middlewares.response);
app.use("/api", router); // Register the routes
app.use(middlewares.errorHandler);

config.db
  .checkConnection()
  .then((result) => {
    console.log("Db connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Could not start the server:", err);
  });

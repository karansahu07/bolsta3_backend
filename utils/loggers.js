const { format, createLogger, transports } = require("winston");
const { printf, combine, timestamp, splat } = format;
require("winston-daily-rotate-file");

const transport = new transports.DailyRotateFile({
  filename: "log/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
});

const logFormat = printf(({ timestamp, level, message, ...meta }) => {
  return `${timestamp} [${level}] ${message}`;
});

const error = (error) =>
  createLogger({
    level: "error",
    format: combine(timestamp(), splat(), logFormat),
    transports: [transport, new transports.Console()],
  }).error(error);

const info = (error) =>
  createLogger({
    level: "info",
    format: combine(timestamp(), splat(), logFormat),
    transports: [
      new transports.File({ filename: "log/info.log" }),
      new transports.Console(),
    ],
  }).info(error);

module.exports = { error, info };

const { RedisStore } = require("connect-redis");
const session = require("express-session");
const { createClient } = require("redis");

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sdl:",
});

// Initialize session storage.

module.exports = session({
  //   store: redisStore,
  resave: false, // required: force lightweight session keep alive (touch)
  saveUninitialized: false, // recommended: only save session when data exists
  secret: "keyboard cat",
  cookie: {
    httpOnly: true, // Prevent JavaScript access to cookies
    secure: false, // Set `true` only if using HTTPS
    sameSite: "lax", // Adjust as needed
    maxAge: 1000 * 60 * 60
  },
});

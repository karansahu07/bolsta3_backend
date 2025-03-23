const express = require("express");
const controllers = require("../controllers");
const utils = require("../../utils");
const middlewares = require("../../middlewares");
const authRoutes = express.Router();

const gethomeRoute = (role) => {
  switch (role) {
    case "superadmin":
      return "/super-dashboard";
    case "admin":
      return "/dashboard";
    case "student":
      return "/practice";
  }
};

authRoutes.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new utils.ApiError("Email and password is required", 400);
    const { token, user } = await controllers.auth.login({ email, password });
    console.log(user);
    res.cookie("token", token);
    res.apiResponse(200, null, { homeRoute: gethomeRoute(user.role), ...user });
  } catch (error) {
    next(error);
  }
});

authRoutes.get("/logout", middlewares.auth, async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.apiResponse(200, null);
  } catch (error) {
    next(error);
  }
});

authRoutes.get("/profile", middlewares.auth, async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    console.log(req.auth);
    const user = await controllers.auth.tokenLogin(userId);
    console.log(user);
    res.apiResponse(200, null, { homeRoute: gethomeRoute(user.role), ...user });
  } catch (error) {
    next(error);
  }
});

module.exports = authRoutes;

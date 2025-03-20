const express = require("express");
const { login } = require("../controllers/authController");
const controllers = require("../controllers");
const utils = require("../../utils");
const authRoutes = express.Router();
const gethomeRoute = (role) => {
  switch (role) {
    case "superadmin":
      return "/superdashboard";
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
    console.log(user)
    res.cookie("token", token);
    res.apiResponse(200, null, { homeRoute: gethomeRoute(user.role), ...user });
  } catch (error) {
    next(error);
  }
});

module.exports = authRoutes;

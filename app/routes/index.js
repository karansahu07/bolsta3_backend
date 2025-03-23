const utils = require("../../utils");
const controllers = require("../controllers");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const superAdminRoutes = require("./superAdminRoutes");

const router = require("express").Router();

router.use("/", superAdminRoutes);

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;

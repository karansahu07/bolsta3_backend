const utils = require("../../utils");
const controllers = require("../controllers");
const userRoutes = require("./UserRoute");
const authRoutes = require("./auth");
const superAdminRoutes = require("./superadminroute");

const router = require("express").Router();

router
  .route("/company")
  .post(async (req, res, next) => {
    try {
      const {
        companyName,
        adminName,
        adminEmail,
        planType,
        subscribers,
        videosPerSubscriber,
      } = req.body;
      const result = await controllers.superAdmin.createCompany({
        companyName,
        adminName,
        adminEmail,
        planType,
        subscribers,
        videosPerSubscriber,
      });
      if (result.companyResult.affectedRows > 0)
        res.apiResponse(200, null, result);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const companies = await controllers.superAdmin.getCompaniesWithUsers(
        page,
        limit
      );
      res.apiResponse(200, null, companies.data, companies.pagination);
    } catch (error) {
      next(error);
    }
  });

router.use("/superadmin", superAdminRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;

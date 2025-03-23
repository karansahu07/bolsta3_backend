const express = require("express");
const superAdminRoutes = express.Router();
const controllers = require("../controllers");
const utils = require("../../utils");
const middlewares = require("../../middlewares");

superAdminRoutes.use(middlewares.auth, middlewares.role.isSuperAdmin);

superAdminRoutes
  .route("/companies")
  .post(async (req, res, next) => {
    try {
      const {
        companyName,
        adminName,
        adminEmail,
        planType,
        planCount,
        subscribers,
        videosPerSubscriber,
        videoTime,
      } = req.body;

      //do validations here

      const result = await controllers.superAdmin.createCompany({
        companyName,
        adminName,
        adminEmail,
        planType,
        planCount,
        subscribers,
        videosPerSubscriber,
        videoTime,
        createdBy: req.auth.userId,
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

module.exports = superAdminRoutes;

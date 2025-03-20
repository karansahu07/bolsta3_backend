const express = require("express");
const router = express.Router();
const { createCompany } = require("../controllers/SuperAdminController");
const utils = require("../../utils");

router.post("/add-company", async (req, res, next) => {
  try {
    const {
      companyName,
      adminName,
      adminEmail,
      planType,
      subscribers,
      videosPerSubscriber,
    } = req.body;

    if (subscribers > 1000 || subscribers < 1) {
      throw new utils.ApiError("Subscribers must be between 1 and 1000", 400);
    }
    if (videosPerSubscriber > 5 || videosPerSubscriber < 1) {
      throw new utils.ApiError(
        "Videos per subscriber must be between 1 and 5",
        400
      );
    }
    const company = await createCompany(req.body);
    res.apiResponse(201, null, company);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { createCompany } = require("../controllers/SuperAdminController");

router.post("/add-company", async(req, res, next)=>{
    try {

        const { company_name, admin_name, admin_email, password, plan_type, subscribers, videos_per_subscriber } = req.body;

        // Validation
            if (subscribers > 1000 || subscribers < 1) {
              return res.status(400).json({ error: "Subscribers must be between 1 and 1000" });
            }
            if (videos_per_subscriber > 5 || videos_per_subscriber < 1) {
              return res.status(400).json({ error: "Videos per subscriber must be between 1 and 5" });
            }
            const company = await createCompany(req.body);
            console.log("in routes", company);
            res.apiResponse(201, null, company);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

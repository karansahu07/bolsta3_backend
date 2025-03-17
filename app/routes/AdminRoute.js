const express = require("express");
const router = express.Router();
const { createCompany } = require("../controllers/AdminController");

router.post("/add-person", async(req, res, next)=>{
    try {

        const { name, email_id } = req.body;

        // Validation
            // if (subscribers > 1000 || subscribers < 1) {
            //   return res.status(400).json({ error: "Subscribers must be between 1 and 1000" });
            // }
            // if (videos_per_subscriber > 5 || videos_per_subscriber < 1) {
            //   return res.status(400).json({ error: "Videos per subscriber must be between 1 and 5" });
            // }
            const person = await createPerson(req.body);
            console.log("in routes", person);
            res.apiResponse(201, null, person);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

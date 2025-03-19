const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const router = express.Router();  // Ensure you're using this router

// Post route for login
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    const sql = `SELECT users.id, users.Email, users.password, Role.type AS role 
FROM users 
JOIN Role ON users.role = Role.id 
WHERE users.Email = ?`;
    db.query(sql, [email], async (err, result) => {
        console.log(result)
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length == 0) {

            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const user = result[0];

        // Compare entered password with stored hashed password
        const match = await user.password == password ? true : false;
        if (!match) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({ message: "Login Successful", user:{email: user.Email, role: user.role, homeRoute: gethomeRoute(user.role)} });
    });
});

const gethomeRoute = (role) =>{
    switch(role){
        case "superadmin" : return "/superdashboard"
        case "admin" : return "/dashboard"         
        case "student" : return "/practice"
    }
}

module.exports = router;  

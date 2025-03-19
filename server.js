const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Make sure this points to the correct auth file

const app = express();

app.use(express.json());
app.use(cors());

// Use /api as a prefix for the auth routes
app.use('/api', authRoutes);  // Register the routes

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Example User Model (you should create this in models/User.js)
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Additional user routes can be added here

module.exports = router;

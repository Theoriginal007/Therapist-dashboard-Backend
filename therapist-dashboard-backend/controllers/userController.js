// controllers/userController.js

const User = require('../models/User'); // Ensure you have a User model defined

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body); // Create a new user with the request body
        await user.save(); // Save the user to the database
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// You can add more functions for updating and deleting users here

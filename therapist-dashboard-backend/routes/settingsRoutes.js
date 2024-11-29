// routes/settingsRoutes.js

const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Get settings for the logged-in user
router.get('/', authMiddleware, settingsController.getSettings);

// Update settings for the logged-in user
router.put(
    '/',
    [
        authMiddleware,
        check('theme', 'Theme should be light or dark').optional().isIn(['light', 'dark']),
        check('notifications', 'Notifications setting is invalid').optional().isBoolean()
    ],
    settingsController.updateSettings
);

module.exports = router;

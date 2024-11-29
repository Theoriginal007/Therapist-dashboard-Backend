const Settings = require('../models/Settings');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Middleware for input validation
exports.validateSettingsInput = [
    // Add express-validator checks here
];

// Update settings for a therapist or patient
exports.updateSettings = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const settings = await Settings.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        logger.info('Settings updated successfully', { settings });
        res.status(200).json({ message: 'Settings updated successfully!', data: settings });
    } catch (error) {
        logger.error('Error updating settings', { error });
        res.status(500).json({ error: 'An error occurred while updating the settings.' });
    }
};

// Get settings for a specific user
exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.findById(req.params.id);
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        logger.info('Settings retrieved successfully', { settings });
        res.status(200).json(settings);
    } catch (error) {
        logger.error('Error retrieving settings', { error });
        res.status(500).json({ error: 'An error occurred while retrieving the settings.' });
    }
};

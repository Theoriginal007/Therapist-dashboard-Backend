const Session = require('../models/Session');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Middleware for input validation
exports.validateSessionInput = [
    // Add express-validator checks here
];

// Schedule a new session
exports.scheduleSession = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const session = new Session(req.body);
        await session.save();
        logger.info('Session scheduled successfully', { session });
        res.status(201).json({ message: 'Session scheduled successfully!', data: session });
    } catch (error) {
        logger.error('Error scheduling session', { error });
        res.status(500).json({ error: 'An error occurred while scheduling the session.' });
    }
};

// Get all sessions for a patient
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ patientId: req.params.patientId });
        logger.info('Sessions retrieved successfully', { sessions });
        res.status(200).json(sessions);
    } catch (error) {
        logger.error('Error retrieving sessions', { error });
        res.status(500).json({ error: 'An error occurred while retrieving sessions.' });
    }
};

// Cancel a session
exports.cancelSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        logger.info('Session cancelled successfully', { id: req.params.id });
        res.status(200).json({ message: 'Session cancelled successfully!' });
    } catch (error) {
        logger.error('Error cancelling session', { error });
        res.status(500).json({ error: 'An error occurred while cancelling the session.' });
    }
};

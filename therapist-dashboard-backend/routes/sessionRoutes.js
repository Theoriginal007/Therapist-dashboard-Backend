// routes/sessionRoutes.js

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Schedule a new therapy session
router.post(
    '/schedule',
    [
        authMiddleware,
        check('therapistId', 'Therapist ID is required').not().isEmpty(),
        check('patientId', 'Patient ID is required').not().isEmpty(),
        check('sessionDate', 'Session date is required').not().isEmpty(),
        check('duration', 'Session duration is required').not().isEmpty()
    ],
    sessionController.scheduleSession
);

// Get a session by ID
router.get('/:sessionId', authMiddleware, sessionController.getSessionById);

// Update a scheduled session
router.put(
    '/:sessionId',
    [
        authMiddleware,
        check('sessionDate', 'Session date is required').optional().not().isEmpty(),
        check('duration', 'Session duration is required').optional().not().isEmpty()
    ],
    sessionController.updateSession
);

// Cancel a scheduled session
router.delete('/:sessionId', authMiddleware, sessionController.cancelSession);

module.exports = router;

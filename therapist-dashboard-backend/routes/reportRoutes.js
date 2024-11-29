// routes/reportRoutes.js

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Generate a new report for a patient
router.post(
    '/generate',
    [
        authMiddleware,
        check('patientId', 'Patient ID is required').not().isEmpty(),
        check('reportContent', 'Report content cannot be empty').not().isEmpty()
    ],
    reportController.generateReport
);

// Get all reports for a specific patient
router.get('/patient/:patientId', authMiddleware, reportController.getReportsByPatient);

// Get report by report ID
router.get('/:reportId', authMiddleware, reportController.getReportById);

// Update a report
router.put(
    '/:reportId',
    [
        authMiddleware,
        check('reportContent', 'Report content cannot be empty').not().isEmpty()
    ],
    reportController.updateReport
);

// Delete a report
router.delete('/:reportId', authMiddleware, reportController.deleteReport);

module.exports = router;

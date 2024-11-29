const Report = require('../models/Report');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Middleware for input validation
exports.validateReportInput = [
    // Add express-validator checks here
];

// Generate a report for a patient
exports.generateReport = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const report = new Report(req.body);
        await report.save();
        logger.info('Report generated successfully', { report });
        res.status(201).json({ message: 'Report generated successfully!', data: report });
    } catch (error) {
        logger.error('Error generating report', { error });
        res.status(500).json({ error: 'An error occurred while generating the report.' });
    }
};

// Get all reports for a patient
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find({ patientId: req.params.patientId });
        logger.info('Reports retrieved successfully', { reports });
        res.status(200).json(reports);
    } catch (error) {
        logger.error('Error retrieving reports', { error });
        res.status(500).json({ error: 'An error occurred while retrieving reports.' });
    }
};

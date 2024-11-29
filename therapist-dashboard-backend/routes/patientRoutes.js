// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Create a new patient profile
router.post(
    '/',
    [
        authMiddleware,
        check('name', 'Name is required').not().isEmpty(),
        check('dateOfBirth', 'Date of Birth is required').not().isEmpty(),
        check('gender', 'Gender is required').not().isEmpty()
    ],
    patientController.createPatient
);

// Get a specific patient by ID
router.get('/:id', authMiddleware, patientController.getPatientById);

// Update patient profile
router.put(
    '/:id',
    [
        authMiddleware,
        check('name', 'Name is required').optional().not().isEmpty(),
        check('dateOfBirth', 'Date of Birth is required').optional().not().isEmpty()
    ],
    patientController.updatePatient
);

// Get patient's medical history
router.get('/:id/history', authMiddleware, patientController.getPatientHistory);

// Delete a patient
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;

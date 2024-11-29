const Patient = require('../models/Patient');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// Middleware for input validation
exports.validatePatientInput = [
    // Add express-validator checks here
];

// Create a new patient profile
exports.createPatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const patient = new Patient(req.body);
        await patient.save();
        logger.info('Patient profile created successfully', { patient });
        res.status(201).json({ message: 'Patient profile created successfully!', data: patient });
    } catch (error) {
        logger.error('Error creating patient profile', { error });
        res.status(500).json({ error: 'An error occurred while creating the patient profile.' });
    }
};

// Get a patient by ID
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        logger.info('Patient retrieved successfully', { patient });
        res.status(200).json(patient);
    } catch (error) {
        logger.error('Error retrieving patient', { error });
        res.status(500).json({ error: 'An error occurred while retrieving the patient.' });
    }
};

// Update patient profile
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        logger.info('Patient profile updated successfully', { patient });
        res.status(200).json({ message: 'Patient profile updated successfully!', data: patient });
    } catch (error) {
        logger.error('Error updating patient profile', { error });
        res.status(500).json({ error: 'An error occurred while updating the patient profile.' });
    }
};

// Delete a patient profile
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        logger.info('Patient profile deleted successfully', { id: req.params.id });
        res.status(200).json({ message: 'Patient profile deleted successfully!' });
    } catch (error) {
        logger.error('Error deleting patient profile', { error });
        res.status(500).json({ error: 'An error occurred while deleting the patient profile.' });
    }
};

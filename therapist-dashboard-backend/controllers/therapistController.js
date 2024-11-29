// controllers/therapistController.js
const Therapist = require('../models/Therapist');

// Get all therapists
exports.getAllTherapists = async (req, res) => {
    try {
        const therapists = await Therapist.find();
        res.json({ success: true, data: therapists });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching therapists' });
    }
};

// Add a new therapist
exports.addTherapist = async (req, res) => {
    try {
        const newTherapist = new Therapist(req.body);
        await newTherapist.save();
        res.status(201).json({ success: true, message: 'Therapist added successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error adding therapist' });
    }
};

// Update therapist
exports.updateTherapist = async (req, res) => {
    try {
        const therapist = await Therapist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, message: 'Therapist updated', data: therapist });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating therapist' });
    }
};

// Delete a therapist
exports.deleteTherapist = async (req, res) => {
    try {
        await Therapist.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Therapist deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting therapist' });
    }
};

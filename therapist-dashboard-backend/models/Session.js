const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sessionDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    notes: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to get all sessions for a therapist
sessionSchema.statics.findSessionsByTherapist = async function(therapistId) {
    return await this.find({ therapistId }).populate('patientId');
};

// Export the Session model
module.exports = mongoose.model('Session', sessionSchema);

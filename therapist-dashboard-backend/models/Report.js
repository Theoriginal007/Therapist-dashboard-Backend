const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
    reportDetails: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to generate report summary for a patient
reportSchema.statics.generateReportSummary = async function(patientId) {
    return await this.aggregate([
        { $match: { patientId } },
        {
            $group: {
                _id: '$therapistId',
                totalReports: { $sum: 1 },
                reportDetails: { $push: '$reportDetails' },
            },
        },
    ]);
};

// Export the Report model
module.exports = mongoose.model('Report', reportSchema);

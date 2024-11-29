const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    emergencyContact: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to find contact by user ID
contactSchema.statics.findByUserId = async function(userId) {
    return await this.findOne({ userId });
};

// Export the Contact model
module.exports = mongoose.model('Contact', contactSchema);

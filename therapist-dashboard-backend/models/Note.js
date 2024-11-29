const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Static method to get notes by session ID
noteSchema.statics.findBySessionId = async function(sessionId) {
    return await this.find({ sessionId });
};

// Export the Note model
module.exports = mongoose.model('Note', noteSchema);

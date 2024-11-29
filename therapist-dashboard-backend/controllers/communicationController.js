const Communication = require('../models/Communication');
const { validationResult } = require('express-validator'); 
const logger = require('../utils/logger'); 

// Middleware for input validation
exports.validateMessageInput = [
    // Add express-validator checks here
];

// Send a new message
exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const message = new Communication(req.body);
        await message.save();
        logger.info('Message sent successfully', { message });
        res.status(201).json({ message: 'Message sent successfully!', data: message });
    } catch (error) {
        logger.error('Error sending message', { error });
        res.status(500).json({ error: 'An error occurred while sending the message.' });
    }
};

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Communication.find({}).populate('sender receiver');
        logger.info('Messages retrieved successfully');
        res.status(200).json(messages);
    } catch (error) {
        logger.error('Error retrieving messages', { error });
        res.status(500).json({ error: 'An error occurred while retrieving messages.' });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Communication.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        logger.info('Message deleted successfully', { id: req.params.id });
        res.status(200).json({ message: 'Message deleted successfully!' });
    } catch (error) {
        logger.error('Error deleting message', { error });
        res.status(500).json({ error: 'An error occurred while deleting the message.' });
    }
};

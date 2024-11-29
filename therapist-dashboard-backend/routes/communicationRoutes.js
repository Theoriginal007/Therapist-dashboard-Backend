// routes/communicationRoutes.js

const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// Send a communication message
router.post(
    '/send',
    [
        authMiddleware,
        check('recipientId', 'Recipient is required').not().isEmpty(),
        check('message', 'Message cannot be empty').not().isEmpty()
    ],
    communicationController.sendMessage
);

// Get all communications by conversation ID with pagination
router.get('/:conversationId', authMiddleware, communicationController.getMessagesByConversation);

module.exports = router;

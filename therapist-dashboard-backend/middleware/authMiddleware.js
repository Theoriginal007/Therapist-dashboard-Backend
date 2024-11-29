const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const logger = require('../utils/logger');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: 'Too many requests, please try again later.' },
});

// Middleware to authenticate JWT and apply rate limiting
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        logger.warn('No token provided');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            logger.error('Token validation failed', { error: err.message });
            return res.status(403).json({ message: 'Token is not valid' });
        }

        req.user = user;
        logger.info('User authenticated', { user: user.username });
        next();
    });
};

// Apply rate limiting middleware
module.exports = {
    authenticateJWT,
    limiter,
};

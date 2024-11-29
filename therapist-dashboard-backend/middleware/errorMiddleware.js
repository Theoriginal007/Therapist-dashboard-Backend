const logger = require('../utils/logger');

// Enhanced error handling middleware
const errorHandler = (err, req, res, next) => {
    // Determine error type and status code
    const statusCode = err.status || (err.name === 'ValidationError' ? 400 : 500);

    // Log detailed error information with environment check
    logger.logError({
        message: err.message || 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        statusCode,
        timestamp: new Date().toISOString(),
    });

    // Structured error response
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development only
    });
};

module.exports = errorHandler;

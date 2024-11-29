const logger = require('../utils/logger');

// Advanced logger middleware
const loggerMiddleware = (req, res, next) => {
    const startTime = Date.now();
    
    // Log the incoming request details
    logger.info(`Incoming request: ${req.method} ${req.url}`, {
        headers: req.headers,
        query: req.query,
        body: req.body,
        timestamp: new Date().toISOString(),
    });

    // Attach a listener to log the response details after the response is sent
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info(`Response sent: ${res.statusCode} in ${duration}ms`, {
            body: res.body, // Log response body if needed
            timestamp: new Date().toISOString(),
        });
    });

    next();
};

module.exports = loggerMiddleware;

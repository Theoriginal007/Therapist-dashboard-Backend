const winston = require('winston');
const path = require('path');

// Define log levels
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue',
    },
};

winston.addColors(logLevels.colors);

// Configure the logger with additional transports and levels
const logger = winston.createLogger({
    levels: logLevels.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug', // Log debug and higher to console
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            format: winston.format.json(),
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
            format: winston.format.json(),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/exceptions.log'),
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/rejections.log'),
        }),
    ],
});

// Custom log functions to enhance logging flexibility
const logError = (errorInfo) => {
    logger.error({
        message: errorInfo.message || 'An error occurred',
        stack: errorInfo.stack || 'No stack available',
        path: errorInfo.path || 'No path provided',
        method: errorInfo.method || 'No method provided',
        statusCode: errorInfo.statusCode || 500,
        timestamp: new Date().toISOString(),
    });
};

const logInfo = (message) => {
    logger.info({
        message,
        timestamp: new Date().toISOString(),
    });
};

// Log request details for enhanced debugging and tracing
const logRequest = (req) => {
    logger.http({
        message: 'Incoming request',
        method: req.method,
        url: req.url,
        body: req.body,
        query: req.query,
        headers: req.headers,
        timestamp: new Date().toISOString(),
    });
};

// Log response details to complement request logs
const logResponse = (res) => {
    logger.http({
        message: 'Outgoing response',
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        timestamp: new Date().toISOString(),
    });
};

module.exports = {
    logger,
    logError,
    logInfo,
    logRequest,
    logResponse,
};

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure logger with Winston
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: process.env.LOG_FILE_PATH || 'logs/app.log' })
    ]
});

// Middlewares
app.use(cors({
    origin: process.env.ALLOW_ORIGINS.split(','),
    credentials: true,
}));
app.use(bodyParser.json());
app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
}));

// Configure session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Prevent creating session for unauthenticated requests
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
        httpOnly: true, // Helps prevent XSS
        maxAge: 1000 * 60 * 60, // Session expiration time in ms
    }
}));

// MongoDB Connection Setup
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connected successfully.'))
    .catch(err => {
        logger.error('MongoDB connection error:', err);
        process.exit(1); // Exit if MongoDB connection fails
    });

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'API is up and running!' });
});

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Therapist Dashboard API!');
});

// Import and use routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});

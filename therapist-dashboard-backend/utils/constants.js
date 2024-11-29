// utils/constants.js

// Error messages
const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found. Please check the provided information.',
    PATIENT_NOT_FOUND: 'Patient not found. Please ensure the patient ID is correct.',
    SESSION_NOT_FOUND: 'Session not found. Please verify the session details.',
    INVALID_CREDENTIALS: 'Invalid credentials provided. Please try again.',
    REQUIRED_FIELD: 'This field is required. Please fill it in.',
    FILE_TOO_LARGE: 'File size exceeds the allowed limit of 5MB.',
    INVALID_FILE_TYPE: 'Invalid file type. Please upload a PDF or an image file.',
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this resource.',
    INTERNAL_SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};

// User roles
const USER_ROLES = {
    THERAPIST: 'therapist',
    ADMIN: 'admin',
    PATIENT: 'patient',
    SUPER_ADMIN: 'super_admin', // Additional role for future needs
};

// Validation patterns
const VALIDATION_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
    PHONE: /^\+?[1-9]\d{1,14}$/, // E.164 format for phone numbers
};

// Other constants
const UPLOAD_LIMIT_MB = 5; // Limit for file uploads in MB
const UPLOAD_PATH = '/uploads/documents/'; // Path for uploaded documents

module.exports = {
    ERROR_MESSAGES,
    USER_ROLES,
    VALIDATION_PATTERNS,
    UPLOAD_LIMIT_MB,
    UPLOAD_PATH,
};

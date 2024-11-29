const { check, validationResult } = require('express-validator');

// Custom error handling middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Collect all error messages in a structured format
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));
        return res.status(400).json({
            status: 'fail',
            errors: formattedErrors,
        });
    }
    next();
};

// Validation and sanitization for user registration
const validateUserRegistration = [
    check('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
        .matches(/^[A-Za-z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

    check('email')
        .trim()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    check('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character')
        .escape(),

    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    handleValidationErrors,
];

// Validation and sanitization for user login
const validateUserLogin = [
    check('email')
        .trim()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    check('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .escape(),

    handleValidationErrors,
];

// Example: Validation and sanitization for updating a user profile
const validateUserProfileUpdate = [
    check('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
        .matches(/^[A-Za-z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),

    check('email')
        .optional()
        .trim()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    check('bio')
        .optional()
        .trim()
        .isLength({ max: 200 }).withMessage('Bio must be under 200 characters')
        .escape(),

    handleValidationErrors,
];

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserProfileUpdate,
};

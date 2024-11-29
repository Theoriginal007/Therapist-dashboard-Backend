// utils/helpers.js

const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// Format date to a specific string format (e.g., "MM/DD/YYYY")
const formatDate = (date, format = 'MM/DD/YYYY') => {
    return moment(date).format(format);
};

// Generate a unique identifier for sessions, patients, or reports
const generateUniqueId = () => {
    return uuidv4();
};

// Generate a random password
const generateRandomPassword = (length = 12) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

// Check if an object is empty
const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

module.exports = {
    formatDate,
    generateUniqueId,
    generateRandomPassword,
    isObjectEmpty,
};

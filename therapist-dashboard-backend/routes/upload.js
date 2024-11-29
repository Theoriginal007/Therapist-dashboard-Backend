// routes/upload.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

// Multer configuration for secure file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Validate file types (e.g., PDFs, images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Only PDFs, JPEG, and PNG files are allowed.');
        error.status = 400;
        return cb(error, false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// Upload a document securely
router.post('/', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    res.status(200).json({
        success: true,
        message: 'File uploaded successfully!',
        filePath: req.file.path
    });
});

module.exports = router;

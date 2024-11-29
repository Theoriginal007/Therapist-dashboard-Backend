const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); // Define the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to the original filename
    },
});

// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf/; // Acceptable file types
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File type not supported!'); // Reject unsupported files
        }
    },
});

// Export the upload function
module.exports = upload;

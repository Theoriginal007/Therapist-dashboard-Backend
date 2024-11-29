const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required.'],
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required.'],
        validate: {
            validator: function (value) {
                return value <= Date.now(); // Ensure the date of birth is not in the future
            },
            message: 'Date of birth cannot be in the future.',
        },
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender.',
        },
        required: [true, 'Gender is required.'],
    },
    medicalHistory: {
        type: String,
        trim: true,
        default: 'No known medical history', // Default value
    },
    allergies: {
        type: [String], // Array of strings for allergies
        default: [], // Default to empty array
    },
    emergencyContact: {
        name: {
            type: String,
            required: [true, 'Emergency contact name is required.'],
        },
        phone: {
            type: String,
            required: [true, 'Emergency contact phone is required.'],
            validate: {
                validator: function (value) {
                    return /\d{10}/.test(value); // Validate as a 10-digit number
                },
                message: 'Emergency contact phone must be a valid 10-digit number.',
            },
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Virtual for age calculation
patientSchema.virtual('age').get(function () {
    const ageDifMs = Date.now() - this.dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

// Middleware to handle pre-save actions
patientSchema.pre('save', function (next) {
    if (!this.medicalHistory) {
        this.medicalHistory = 'No known medical history'; // Assign default value if empty
    }
    next();
});

// Export the Patient model
module.exports = mongoose.model('Patient', patientSchema);

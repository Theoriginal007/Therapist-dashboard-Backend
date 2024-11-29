const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['therapist', 'patient'],
        default: 'patient',
    },
    profilePicture: {
        type: String,
        default: 'default.jpg', // Points to a default image path
    },
    phone: {
        type: String,
        validate: {
            validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v),
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    address: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to find user by email
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email });
};

// Export the User model
module.exports = mongoose.model('User', userSchema);

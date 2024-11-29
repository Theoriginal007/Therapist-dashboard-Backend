const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Email transporter setup (for sending reset link)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
});

// Login Route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Signup Route
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });

        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get Current User
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Password Reset Request Route
exports.resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate password reset token
        const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send password reset email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Password Reset Route
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Hash the new password and update the user
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Logout Route (Optional)
// You can implement logout functionality by deleting the JWT from the frontend.
// No server-side changes are strictly needed for basic logout functionality.
exports.logout = (req, res) => {
    // On logout, just delete the token on the client-side.
    res.json({ message: "Logged out successfully" });
};

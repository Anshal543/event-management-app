import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alikhanqwedfg@gmail.com',
        pass: '12345678'
    }
});

const sendResetEmail = (email, token) => {
    const mailOptions = {
        from: 'alikhanqwedfg@gmail.com', // Correct sender email address
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: http://localhost:8080/api/v1/users/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err); // Log detailed error
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Controller to handle forgot password
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        sendResetEmail(user.email, token);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        next(error);
    }
};

// Controller to handle reset password
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        next(error);
    }
};

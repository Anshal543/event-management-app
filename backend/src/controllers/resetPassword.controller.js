import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

dotenv.config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const sendResetEmail = (email, token) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: http://localhost:5173/reset-password/${token}`,
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
        console.log(`Forgot password request received for email: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        console.log(`Generated reset token for user: ${email}`);

        sendResetEmail(user.email, token);
        console.log(`Password reset email sent to: ${user.email}`);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        next(error);
    }
};

// Controller to handle reset password
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        console.log(`Reset password request received with token: ${token}`);

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log('Password reset token is invalid or has expired');
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        console.log(`Password reset successfully for user: ${user.email}`);

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        next(error);
    }
};

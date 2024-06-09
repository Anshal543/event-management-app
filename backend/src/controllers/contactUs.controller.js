import { ContactUs } from '../models/contactUs.model.js';
import nodemailer from 'nodemailer';

// export const contactAdmin = async (req, res, next) => {
//     try {
//         const { name, email, subject, message } = req.body;

//         // Validate user input
//         if (!name || !email || !subject || !message) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Create a new contact request
//         const contactRequest = new ContactUs({ name, email, subject, message });
//         await contactRequest.save();

//         // Configure Nodemailer
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: email,
//             to: process.env.ADMIN_EMAIL, // Ensure this is set in your environment variables
//             subject: `New Contact Request: ${subject}`,
//             text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//         };

//         // Send email to admin
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ message: 'Error sending email' });
//             } else {
//                 console.log('Email sent:', info.response);
//                 return res.status(200).json({ message: 'Contact request sent successfully' });
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };



// Function to save a contact request and notify admin
export const contactAdmin = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate user input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new contact request
        const contactRequest = await ContactUs.create({ name, email, subject, message });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.ADMIN_EMAIL, // Ensure this is set in your environment variables
            subject: `New Contact Request: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        // Send email to admin
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'Contact request sent successfully' });
            }
        });
    } catch (error) {
        next(error);
    }
};

// Function to fetch all contact requests
export const getContactRequests = async (req, res, next) => {
    try {
        const contactRequests = await ContactUs.find();
        res.status(200).json(contactRequests);
    } catch (error) {
        next(error);
    }
};

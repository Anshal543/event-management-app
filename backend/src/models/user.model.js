import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Name Required!"],
        minLength: [3, "Name must contain at least 3 characters!"],
    },
    email: {
        type: String,
        required: [true, "Email Required!"],
        unique: true,
        validate: [validator.isEmail, "Please provide valid email!"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password must contain at least 8 characters!"],

    },
    mobileNo: {
        type: String,
        unique: true,
        required: true,
        minLength: [11, "Mobile Number must contain at least 11 characters!"],
        maxLength: [11, "Mobile Number must contain at most 11 characters!"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    participatedEvents: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
    ],


}, { timestamps: true });


export const User = mongoose.model('User', userSchema);
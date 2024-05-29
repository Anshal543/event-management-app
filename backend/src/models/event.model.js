import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: [true, "Title Required!"],
            minLength: [3, "Title must contain at least 3 characters!"],
        },
        description: {
            type: String,
            required: [true, "Description Required!"],
            minLength: [10, "Description must contain at least 10 characters!"],
        },
        image: {
            type: String,
            required: [true, "Image Required!"],
        },

        typeOfEvent: {
            //technical, cultural , social
            type: String,
            required: true,
            minLength: [3, "Type must contain at least 3 characters!"],
        },
        location: {
            type: String,
            required: [true, "Location Required!"],
            minLength: [3, "Location must contain at least 3 characters!"],
        },

        registrationFee: {
            type: Number,
            default: 0,
        },

        registrationStart: {
            type: Date,
            required: true,
        },
        startOfEvent: {
            type: Date,
            required: true,
        },
        endOfEvent: {
            type: Date,
            required: true,
        },
        timeOfEvent: {
            type: String,
            required: true,
        },
        dateOfResult: {
            type: Date,
        },

        winner: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        amountOfWinner: {
            type: Number,
            default: 0,
        },
        typeOfCompetition: {
            type: String,
            minLength: [3, "Type must contain at least 3 characters!"],
        },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);

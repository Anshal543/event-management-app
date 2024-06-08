import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createEvent = async (req, res, next) => {
    const {
        title,
        description,
        typeOfEvent,
        location,
        registrationFee,
        registrationStart,
        startOfEvent,
        endOfEvent,
        timeOfEvent,
        city,
        dateOfResult,
        amountOfWinner,
        typeOfCompetition,
    } = req.body;

    if (
        [
            title,
            description,
            typeOfEvent,
            location,
            registrationFee,
            registrationStart,
            startOfEvent,
            endOfEvent,
            timeOfEvent,
            city,
        ].some((field) => field?.trim() === "")
    ) {
        return next(customError(400, "All fields are required!"));
    }
    try {
        const event = await Event.findOne({
            $or: [{ title: { $regex: title, $options: "i" } }],
        });
        if (event) {
            return next(customError(400, "Event already exists!"));
        }

        const imageLocalPath = req.files?.image[0]?.path;
        if (!imageLocalPath) {
            return next(customError(400, "Image Required!"));
        }
        const image = await uploadOnCloudinary(imageLocalPath);

        if (!image) {
            return next(customError(500, "Image upload failed!"));
        }

        const newEvent = await Event.create({
            title,
            description,
            image: image.url,
            typeOfEvent,
            location,
            city,
            registrationFee,
            registrationStart: new Date(registrationStart).toISOString(),
            startOfEvent: new Date(startOfEvent).toISOString(),
            endOfEvent: new Date(endOfEvent).toISOString(),
            timeOfEvent,
            dateOfResult: dateOfResult ? new Date(dateOfResult).toISOString() : null,
            amountOfWinner: amountOfWinner || null,
            typeOfCompetition: typeOfCompetition || null,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
};

export const getEvents = async (req, res, next) => {
    try {
        // const { title } = req.body;
        // const events = await Event.find({
        //     $or: [
        //         { title: { $regex: title, $options: 'i' } }
        //     ]
        // });
        const events = await Event.find().populate("winner", "_id username email")
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

export const getSingleEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate("winner", "_id username email");
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};


export const registerInEvent = async (req, res, next) => {
    try {
        const { eventId, userId } = req.params;

        // Ensure eventId and userId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return next(customError(400, "Invalid eventId or userId!"));
        }

        const event = await Event.findById(eventId).populate("participants");
        if (!event) {
            return next(customError(404, "Event not found!"));
        }

        const user = await User.findById(userId).populate("participatedEvents");
        if (!user) {
            return next(customError(404, "User not found!"));
        }

        // Check if the user is already registered in the event
        const isUserRegistered = event.participants.some(participant => participant.equals(userId));
        if (isUserRegistered) {
            return next(customError(400, "Already registered!"));
        }

        // Register the user in the event
        event.participants.push(userId);
        user.participatedEvents.push(eventId);

        await event.save();
        await user.save();

        res.status(200).json({
            message: "User registered for the event successfully!",
            event,
            user,
        });
    } catch (error) {
        next(error);
    }
};

// export const registerInEvent = async (req, res, next) => {
//     try {
//         const { eventId, userId } = req.params;
//         const event = await Event.findById(eventId).populate("participants");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }
//         const user = await User.findById(userId).populate("participatedEvents");
//         if (!user) {
//             return next(customError(404, "User not found!"));
//         }
//         if (event.participants.includes(userId)) {
//             return next(customError(400, "Already registered!"));
//         }
//         event.participants.push(userId);
//         user.participatedEvents.push(eventId);
//         await event.save();
//         await user.save();
//         res.status(200).json({
//             message: "User registered for the event successfully!",
//             event,
//             user,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
// const registrationDates = {}; // In-memory storage for registration dates

// export const registerInEvent = async (req, res, next) => {
//     try {
//         const { eventId, userId } = req.params;
//         const event = await Event.findById(eventId).populate("participants");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }
//         const user = await User.findById(userId).populate("participatedEvents");
//         if (!user) {
//             return next(customError(404, "User not found!"));
//         }
//         if (event.participants.includes(userId)) {
//             return next(customError(400, "Already registered!"));
//         }
        
//         // Add the user to the event's participants and vice versa
//         event.participants.push(userId);
//         user.participatedEvents.push(eventId);
        
//         // Store the registration date in memory
//         const registrationDate = new Date();
//         if (!registrationDates[userId]) {
//             registrationDates[userId] = {};
//         }
//         registrationDates[userId][eventId] = registrationDate;
        
//         await event.save();
//         await user.save();
        
//         res.status(200).json({
//             message: "User registered for the event successfully!",
//             event,
//             user,
//             registrationDate
//         });
//     } catch (error) {
//         next(error);
//     }
// };
// export const registerInEvent = async (req, res, next) => {
//     try {
//         const { eventId, userId } = req.params;
//         const event = await Event.findById(eventId).populate("participants.userId");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }
//         const user = await User.findById(userId).populate("participatedEvents");
//         if (!user) {
//             return next(customError(404, "User not found!"));
//         }
//         const alreadyRegistered = event.participants.some(participant => participant.userId.toString() === userId);
//         if (alreadyRegistered) {
//             return next(customError(400, "Already registered!"));
//         }

//         // if (event.participants.includes(userId)) {
//         //     return next(customError(400, "Already registered!"));
//         // }
//         const registrationDate = new Date();
//         // Add the user to the event's participants and vice versa
//         event.participants.push({userId, registrationDate});
//         user.participatedEvents.push(eventId);
        
//         // Store the registration date in memory
//         // const registrationDate = new Date();
//         // if (!registrationDates[userId]) {
//         //     registrationDates[userId] = {};
//         // }
//         // registrationDates[userId][eventId] = registrationDate;
        
//         await event.save();
//         await user.save();
        
//         // Send registrationDate along with user data
//         res.status(200).json({
//             message: "User registered for the event successfully!",
//             event,
//             user,
//             registrationDate
//         });
//     } catch (error) {
//         next(error);
//     }
// };
// export const registerInEvent = async (req, res, next) => {
//     try {
//         const { eventId, userId } = req.params;

//         // Find the event by ID and populate participants
//         const event = await Event.findById(eventId).populate("participants");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }

//         // Initialize participants if it's undefined
//         if (!event.participants) {
//             event.participants = [];
//         }

//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return next(customError(404, "User not found!"));
//         }

//         // Check if the user is already registered for the event
//         const alreadyRegistered = event.participants.some(participant => participant.toString() === userId);
//         if (alreadyRegistered) {
//             return next(customError(400, "User is already registered for this event!"));
//         }

//         // Add the user to the event's participants
//         event.participants.push(userId);
//         const registrationDate = new Date();

//         // Save the updated event
//         await event.save();

//         // Send the response with the registration date
//         res.status(200).json({
//             message: "User registered for the event successfully!",
//             event: {
//                 _id: event._id,
//                 participants: event.participants.map(participant => ({
//                     userId: participant,
//                     registrationDate: registrationDate
//                 }))
//             },
//             registrationDate
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const getRegisteredEvents = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate("participatedEvents");
        if (!user) {
            return next(customError(404, "User not found!"));
        }
        
        res.status(200).json(user.participatedEvents);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        res.status(200).json({
            message: "Event deleted successfully!",
        });
    } catch (error) {
        next(error);
    }
};


export const updateEvent = async (req, res, next) => {
    const {
        title,
        description,
        typeOfEvent,
        location,
        registrationFee,
        registrationStart,
        startOfEvent,
        endOfEvent,
        timeOfEvent,
        city,
        dateOfResult,
        amountOfWinner,
        typeOfCompetition,
        winner
    } = req.body;

    const { id } = req.params;

    try {
        const updateData = {};

        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (typeOfEvent) updateData.typeOfEvent = typeOfEvent;
        if (location) updateData.location = location;
        if (registrationFee !== undefined) updateData.registrationFee = registrationFee;
        if (registrationStart) updateData.registrationStart = new Date(registrationStart).toISOString();
        if (startOfEvent) updateData.startOfEvent = new Date(startOfEvent).toISOString();
        if (endOfEvent) updateData.endOfEvent = new Date(endOfEvent).toISOString();
        if (timeOfEvent) updateData.timeOfEvent = timeOfEvent;
        if (city) updateData.city = city;
        if (dateOfResult) updateData.dateOfResult = new Date(dateOfResult).toISOString();
        if (amountOfWinner !== undefined) updateData.amountOfWinner = amountOfWinner;
        if (typeOfCompetition) updateData.typeOfCompetition = typeOfCompetition;

        // Handle image upload if provided
        if (req.files?.image) {
            const imageLocalPath = req.files.image[0].path;
            const image = await uploadOnCloudinary(imageLocalPath);

            if (!image) {
                return next(customError(500, "Image upload failed!"));
            }

            updateData.image = image.url;
        }

        // Add winner by email logic
        if (winner) {
            const user = await User.findOne({ email: winner });
            if (!user) {
                return next(customError(404, "User not found!"));
            }

            // Using $addToSet to avoid duplicates
            updateData.winner = user
            // updateData.user = user
        }
        // const winnerDetails = await User.findById(updateData.winner);
        // if (!winnerDetails) {
        //     return next(customError(404, "Winner not found!"));
        // }

        // Update the event
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true }).populate('winner', "_id username email");
    

        if (!updatedEvent) {
            return next(customError(404, "Event not found!"));
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
};

export const getRegisteredUsers = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId).populate("participants");
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        res.status(200).json(event.participants);
    } catch (error) {
        next(error);
    }
};


// export const getRegisteredUsers = async (req, res, next) => {
//     try {
//         const { eventId } = req.params;
//         const event = await Event.findById(eventId).populate("participants");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }

//         // Add registration dates to participants
//         const participantsWithRegistrationDates = event.user.map(participant => {
//             const registrationDate = registrationDates[participant._id] ? registrationDates[participant._id]?.[eventId] : null;
//             return {
//                 ...participant._doc, // Spread the participant document
//                 registrationDate: registrationDate
//             };
//         });

//         // Create the response object with the updated participants
//         const eventWithRegistrationDates = {
//             ...event._doc, // Spread the event document
//             participants: participantsWithRegistrationDates // Replace participants with the updated list
//         };

//         res.status(200).json(eventWithRegistrationDates);
//     } catch (error) {
//         next(error);
//     }
// };
// export const getRegisteredUsers = async (req, res, next) => {
//     try {
//         const { eventId, userId } = req.params;
        
//         // Fetch the event details
//         const event = await Event.findById(eventId).populate("participants");
//         if (!event) {
//             return next(customError(404, "Event not found!"));
//         }
        
//         // Fetch the user details
//         const user = await User.findById(userId).populate("participatedEvents");
//         if (!user) {
//             return next(customError(404, "User not found!"));
//         }
        
//         // Check if the user is registered for the event
//         if (!event.participants.includes(userId)) {
//             return next(customError(400, "User is not registered for this event!"));
//         }
        
//         // Fetch registration date if you store it in a database
//         // Assuming you store registrationDate in an array within the event or user document
//         // Example: If the event has a participants array with objects { userId, registrationDate }
//         const participant = event.participants.find(participant => participant.userId.toString() === userId);
//         const registrationDate = participant ? participant.registrationDate : null;

//         res.status(200).json({
//             message: "User registration details retrieved successfully!",
//             event,
//             user,
//             registrationDate
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const leaveEvent = async (req, res, next) => {
    try {
        const { eventId, userId } = req.params;

        // Find the event and check if it exists
        const event = await Event.findById(eventId).populate("participants");
        if (!event) {
            return next(customError(404, "Event not found!"));
        }

        // Find the user and check if it exists
        const user = await User.findById(userId).populate("participatedEvents");
        if (!user) {
            return next(customError(404, "User not found!"));
        }

        // Check if the user is registered for the event
        if (!event.participants.some(participant => participant._id.equals(userId))) {
            return next(customError(400, "Not registered in the event!"));
        }

        // Remove user from event participants and event from user's participated events
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId, 
            { $pull: { participants: userId } }, 
            { new: true }
        ).populate("participants");

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $pull: { participatedEvents: eventId } }, 
            { new: true }
        ).populate("participatedEvents");

        res.status(200).json({
            message: "User left the event successfully!",
            event: updatedEvent,
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
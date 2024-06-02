import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';



export const createEvent = async (req, res, next) => {
    const { title, description, typeOfEvent, location, registrationFee, registrationStart, startOfEvent, endOfEvent, timeOfEvent } = req.body;


    if ([title, description, typeOfEvent, location, registrationFee, registrationStart, startOfEvent, endOfEvent, timeOfEvent].some(field => field?.trim() === "")) {
        return next(customError(400, "All fields are required!"));
    }
    try {
        const event = await Event.findOne({
            $or: [
                { title: { $regex: title, $options: 'i' } }
            ]
        });
        if (event) {
            return next(customError(400, "Event already exists!"));
        }
        // TODO : destructuring the req.body and create a new event

        const imageLocalPath = req.files?.image[0]?.path;
        if (!imageLocalPath) {
            return next(customError(400, "Image Required!"));
        }
        const image = await uploadOnCloudinary(imageLocalPath);


        if (!image) {
            return next(customError(500, "Image upload failed!"));
        }
        // const newEvent = await Event.create({
        //     title,
        //     description,
        //     image: image.url,
        //     typeOfEvent,
        //     location,
        //     registrationFee,
        //     registrationStart,
        //     startOfEvent,
        //     endOfEvent,
        //     timeOfEvent
        // });
        const newEvent = await Event.create({
            title,
            description,
            image: image.url,
            typeOfEvent,
            location,
            registrationFee,
            registrationStart: new Date(registrationStart).toISOString(),
            startOfEvent: new Date(startOfEvent).toISOString(),
            endOfEvent: new Date(endOfEvent).toISOString(),
            timeOfEvent,
        });




        res.status(201).json(newEvent);
    }
    catch (error) {
        next(error)
    }
}


export const getEvents = async (req, res, next) => {
    try {


        // const { title } = req.body;
        // const events = await Event.find({
        //     $or: [
        //         { title: { $regex: title, $options: 'i' } }
        //     ]
        // });
        const events = await Event.find();
        res.status(200).json(events);
    }
    catch (error) {
        next(error)
    }
}

export const getSingleEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        res.status(200).json(event);
    }
    catch (error) {
        next(error)
    }
}

export const registerInEvent = async (req, res, next) => {
    try {
        const { eventId, userId } = req.params
        const event = await Event.findById(eventId).populate('participants')
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        const user = await User.findById(userId).populate('participatedEvents')
        if (!user) {
            return next(customError(404, "User not found!"));
        }
        if (event.participants.includes(userId)) {
            return next(customError(400, "Already registered!"));
        }
        event.participants.push(userId);
        user.participatedEvents.push(eventId);
        await event.save();
        await user.save();
        res.status(200).json({
            message: 'User registered for the event successfully!',
            event,
            user,
        });

    } catch (error) {
        next(error)
    }
}

export const getRegisteredEvents = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('participatedEvents');
        if (!user) {
            return next(customError(404, "User not found!"));
        }
        res.status(200).json(user.participatedEvents);
    }
    catch (error) {
        next(error)
    }

}

// delete event by admin only

export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return next(customError(404, "Event not found!"));
        }
        res.status(200).json({
            message: 'Event deleted successfully!',
        });
    }
    catch (error) {
        next(error)
    }
}
import { Event } from "../models/event.model.js";
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
        const newEvent = await Event.create({
            title,
            description,
            image: image.url,
            typeOfEvent,
            location,
            registrationFee,
            registrationStart,
            startOfEvent,
            endOfEvent,
            timeOfEvent
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
/*
export const updateEvent = async (req, res, next) => {
    
    const { id } = req.params;
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
    } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return next(customError(404, "Event not found!"));
        }

        let updatedData = {
            title,
            description,
            typeOfEvent,
            location,
            registrationFee,
            registrationStart: new Date(registrationStart).toISOString(),
            startOfEvent: new Date(startOfEvent).toISOString(),
            endOfEvent: new Date(endOfEvent).toISOString(),
            timeOfEvent,
            city,
        };

        // Handle image upload if an image is provided
        if (req.files?.image) {
            const imageLocalPath = req.files.image[0].path;
            const image = await uploadOnCloudinary(imageLocalPath);

            if (!image) {
                return next(customError(500, "Image upload failed!"));
            }

            // Remove the old image if it exists and update with the new one
            if (event.image) {
                // Add your logic to delete the old image from Cloudinary
            }

            updatedData.image = image.url;

            // Clean up local file after upload
            // await fs.unlink(imageLocalPath);
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
};
*/



/*
export const updateEvent = async (req, res, next) => {
    const { id } = req.params;
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

    try {
        const event = await Event.findById(id);
        if (!event) {
            return next(customError(404, "Event not found!"));
        }

        let updatedData = {
            title,
            description,
            typeOfEvent,
            location,
            registrationFee,
            registrationStart: new Date(registrationStart).toISOString(),
            startOfEvent: new Date(startOfEvent).toISOString(),
            endOfEvent: new Date(endOfEvent).toISOString(),
            timeOfEvent,
            city,
            dateOfResult: dateOfResult ? new Date(dateOfResult).toISOString() : null,
            amountOfWinner: amountOfWinner || null,
            typeOfCompetition: typeOfCompetition || null,
        };

        // Handle image upload if an image is provided
        if (req.files?.image) {
            const imageLocalPath = req.files.image[0].path;
            const image = await uploadOnCloudinary(imageLocalPath);

            if (!image) {
                return next(customError(500, "Image upload failed!"));
            }

            // Remove the old image if it exists and update with the new one
            if (event.image) {
                // Add your logic to delete the old image from Cloudinary
            }

            updatedData.image = image.url;

            // Clean up local file after upload
            // await fs.unlink(imageLocalPath);
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
};
*/

/*

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
        winnerEmail
    } = req.body;

    const { eventId } = req.params;

    try {
        let event = await Event.findById(eventId).populate('winner');
        if (!event) {
            return next(customError(404, "Event not found!"));
        }

        // Optional fields update logic
        if (title) event.title = title;
        if (description) event.description = description;
        if (typeOfEvent) event.typeOfEvent = typeOfEvent;
        if (location) event.location = location;
        if (registrationFee !== undefined) event.registrationFee = registrationFee;
        if (registrationStart) event.registrationStart = new Date(registrationStart).toISOString();
        if (startOfEvent) event.startOfEvent = new Date(startOfEvent).toISOString();
        if (endOfEvent) event.endOfEvent = new Date(endOfEvent).toISOString();
        if (timeOfEvent) event.timeOfEvent = timeOfEvent;
        if (city) event.city = city;
        if (dateOfResult) event.dateOfResult = new Date(dateOfResult).toISOString();
        if (amountOfWinner !== undefined) event.amountOfWinner = amountOfWinner;
        if (typeOfCompetition) event.typeOfCompetition = typeOfCompetition;

        // Handle image upload if provided
        if (req.files?.image) {
            const imageLocalPath = req.files.image[0].path;
            const image = await uploadOnCloudinary(imageLocalPath);

            if (!image) {
                return next(customError(500, "Image upload failed!"));
            }

            event.image = image.url;
        }

        // Add winner by email logic
        if (winnerEmail) {
            const user = await User.findOne({ email: winnerEmail });
            if (!user) {
                return next(customError(404, "User not found!"));
            }
            if (!event.winner.includes(user._id)) {
                event.winner.push(user._id);
            }
        }

        // Save the updated event
        event = await event.save();
        event = await Event.findById(eventId).populate('winner'); // Re-populate after save

        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
};
*/
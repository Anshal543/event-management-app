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


// export const leaveEvent = async (req, res, next) => {
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
//         if (!event.participants.includes(userId)) {
//             return next(customError(400, "Not registered in the event!"));
//         }
//         event.participants = event.participants.filter((id) => id.toString() !== userId);
//         user.participatedEvents = user.participatedEvents.filter((id) => id.toString() !== eventId);
//         await event.save();
//         await user.save();
//         res.status(200).json({
//             message: "User left the event successfully!",
//             event,
//             user,
//         });
//     }
//     catch (error) {
//         next(error);
//     }
// }
//do this with find by id and update or delelte
// export const leaveEvent = async (req, res, next) => {
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
//         if (!event.participants.includes(userId)) {
//             return next(customError(400, "Not registered in the event!"));
//         }
//         const updatedEvent = await Event.findByIdAndUpdate(eventId, { $pull: { participants: userId } }, { new: true });
//         const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { participatedEvents: eventId } }, { new: true });
//         res.status(200).json({
//             message: "User left the event successfully!",
//             event: updatedEvent,
//             user: updatedUser,
//         });
//     }
//     catch (error) {
//         next(error);
//     }
// }


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

/*
/ export const updateEvent = async (req, res, next) => {
//     const {
//         title,
//         description,
//         typeOfEvent,
//         location,
//         registrationFee,
//         registrationStart,
//         startOfEvent,
//         endOfEvent,
//         timeOfEvent,
//         city,
//         dateOfResult,
//         amountOfWinner,
//         typeOfCompetition,
//         winner
//     } = req.body;

//     const { id } = req.params;

//     try {
//         const updateData = {};

//         if (title) updateData.title = title;
//         if (description) updateData.description = description;
//         if (typeOfEvent) updateData.typeOfEvent = typeOfEvent;
//         if (location) updateData.location = location;
//         if (registrationFee !== undefined) updateData.registrationFee = registrationFee;
//         if (registrationStart) updateData.registrationStart = new Date(registrationStart).toISOString();
//         if (startOfEvent) updateData.startOfEvent = new Date(startOfEvent).toISOString();
//         if (endOfEvent) updateData.endOfEvent = new Date(endOfEvent).toISOString();
//         if (timeOfEvent) updateData.timeOfEvent = timeOfEvent;
//         if (city) updateData.city = city;
//         if (dateOfResult) updateData.dateOfResult = new Date(dateOfResult).toISOString();
//         if (amountOfWinner !== undefined) updateData.amountOfWinner = amountOfWinner;
//         if (typeOfCompetition) updateData.typeOfCompetition = typeOfCompetition;

//         // Handle image upload if provided
//         if (req.files?.image) {
//             const imageLocalPath = req.files.image[0].path;
//             const image = await uploadOnCloudinary(imageLocalPath);

//             if (!image) {
//                 return next(customError(500, "Image upload failed!"));
//             }

//             updateData.image = image.url;
//         }

//         // Handle winner update separately
//         if (winner) {
//             const user = await User.findOne({ email: winner });
//             if (!user) {
//                 return next(customError(404, "User not found!"));
//             }

//             // Update event with new data and add winner using $addToSet
//             const updatedEvent = await Event.findByIdAndUpdate(
//                 id,
//                 {
//                     updateData,
//                      winner: user
//                 },
//                 { new: true }
//             ).populate('winner');

//             if (!updatedEvent) {
//                 return next(customError(404, "Event not found!"));
//             }

//             return res.status(200).json(updatedEvent);
//         } else {
//             // Update event with new data
//             const updatedEvent = await Event.findByIdAndUpdate(
//                 id,
//                 { $set: updateData },
//                 { new: true }
//             ).populate('winner');

//             if (!updatedEvent) {
//                 return next(customError(404, "Event not found!"));
//             }

//             return res.status(200).json(updatedEvent);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

*/
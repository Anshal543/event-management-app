import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRegisteredEvents, selectEvents, selectEventsLoading, selectEventsError } from '../features/events/eventSlice';
import noEvent from '../assets/noEvent.png'; // Update the path as per your folder structure

const GetRegisteredEvents = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Assuming the user ID is passed as a URL parameter
    const events = useSelector(selectEvents);
    const eventsLoading = useSelector(selectEventsLoading);
    const eventsError = useSelector(selectEventsError);

    useEffect(() => {
        dispatch(getRegisteredEvents(id));
    }, [dispatch, id]);

    if (eventsLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <svg
                    className="animate-spin h-10 w-10 text-blue-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                </svg>
                <div className="text-gray-700 text-lg">Loading...</div>
                <div className="absolute bottom-0 w-full">
                    <footer className="bg-gray-800 text-white text-center py-4">
                        &copy; 2024 Your Company. All rights reserved.
                    </footer>
                </div>
            </div>
        );
    }

    if (eventsError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-red-500 text-lg">Error: {eventsError}</div>
                <div className="absolute bottom-0 w-full">
                    <footer className="bg-gray-800 text-white text-center py-4">
                        &copy; 2024 Your Company. All rights reserved.
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">Your Registered Events</h2>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                                {event.image && (
                                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-md mb-4" />
                                )}
                                <p className="text-gray-700 mb-2"><strong>Type:</strong> {event.typeOfEvent}</p>
                                <p className="text-gray-700 mb-2"><strong>Start:</strong> {new Date(event.startOfEvent).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-2"><strong>End:</strong> {new Date(event.endOfEvent).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p>No events registered.</p>
                        <img src={noEvent} alt="No events" className="w-64 h-64 object-cover mt-4" />
                    </div>
                )}
            </div>
            <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
                &copy; 2024 Your Company. All rights reserved.
            </footer>
        </div>
    );
};

export default GetRegisteredEvents;

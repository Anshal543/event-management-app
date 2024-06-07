// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getRegisteredEvents, selectEvents, selectEventsLoading, selectEventsError } from '../features/events/eventSlice';

// const GetRegisteredEvents = () => {
//     const dispatch = useDispatch();
//     const { id } = useParams(); // Assuming the user ID is passed as a URL parameter
//     const events = useSelector(selectEvents);
//     const eventsLoading = useSelector(selectEventsLoading);
//     const eventsError = useSelector(selectEventsError);

//     useEffect(() => {
//         dispatch(getRegisteredEvents(id));
//     }, [dispatch, id]);

//     if (eventsLoading) return <div>Loading...</div>;
//     if (eventsError) return <div>Error: {eventsError}</div>;

//     return (
//         <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
//             <h2 className="text-3xl font-bold mb-4">Your Registered Events</h2>
//             {events.length > 0 ? (
//                 events.map(event => (
//                     <div key={event._id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
//                         <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
//                         {event.image && (
//                             <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4" />
//                         )}
//                         <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.description}</p>
//                         <p className="text-gray-700 mb-2"><strong>Type of Event:</strong> {event.typeOfEvent}</p>
//                         <p className="text-gray-700 mb-2"><strong>Location:</strong> {event.location}</p>
//                         <p className="text-gray-700 mb-2"><strong>Registration Fee:</strong> {event.registrationFee}</p>
//                         <p className="text-gray-700 mb-2"><strong>Registration Start:</strong> {new Date(event.registrationStart).toLocaleDateString()}</p>
//                         <p className="text-gray-700 mb-2"><strong>Start of Event:</strong> {new Date(event.startOfEvent).toLocaleDateString()}</p>
//                         <p className="text-gray-700 mb-2"><strong>End of Event:</strong> {new Date(event.endOfEvent).toLocaleDateString()}</p>
//                         <p className="text-gray-700 mb-2"><strong>Time of Event:</strong> {event.timeOfEvent}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No events registered.</p>
//             )}
//         </div>
//     );
// };

// export default GetRegisteredEvents;


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

    if (eventsLoading) return <div>Loading...</div>;
    if (eventsError) return <div>Error: {eventsError}</div>;


    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
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
    );
};

export default GetRegisteredEvents;


import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEvent, registerForEvent, selectEvents, selectEventsLoading, selectEventsError, selectRegistrationSuccess } from '../features/events/eventSlice';

const GetRegisterEvent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(selectEvents);
    const eventsLoading = useSelector(selectEventsLoading);
    const eventsError = useSelector(selectEventsError);
    const registrationSuccess = useSelector(selectRegistrationSuccess);
    const userId = useSelector(state => state.auth.userInfo.rest._id);

    useEffect(() => {
        dispatch(getSingleEvent(id));
    }, [dispatch, id]);

    const handleRegister = () => {
        dispatch(registerForEvent({ eventId: id, userId }));
    };

    if (eventsLoading) return <div>Loading...</div>;
    if (eventsError) return <div>{eventsError}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
            {event.image && (
                <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4" />
            )}
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description}</p>
            <p className="text-gray-700 mb-4"><strong>Type of Event:</strong> {event.typeOfEvent}</p>
            <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-700 mb-4"><strong>Registration Fee:</strong> {event.registrationFee}</p>
            <p className="text-gray-700 mb-4"><strong>Registration Start:</strong> {new Date(event.registrationStart).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4"><strong>Start of Event:</strong> {new Date(event.startOfEvent).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4"><strong>End of Event:</strong> {new Date(event.endOfEvent).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4"><strong>Time of Event:</strong> {event.timeOfEvent}</p>
            <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
            </button>
            {registrationSuccess && <p className="text-green-500 mt-4">{registrationSuccess}</p>}
        </div>
    );
};

export default GetRegisterEvent;

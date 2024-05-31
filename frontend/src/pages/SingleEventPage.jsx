import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleEvent } from '../features/events/eventSlice';

const SingleEventPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, eventsLoading, eventsError } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  if (eventsLoading) return <div>Loading...</div>;
  if (eventsError) return <div>{eventsError}</div>;

  // Assuming events is an array and we need to find the event by ID
  const event = events.find((event) => event._id === id);

  if (!event) return <div>Event not found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date ? date.toLocaleDateString() : 'N/A';
  };

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
      <p className="text-gray-700 mb-4"><strong>Registration Start:</strong> {formatDate(event.registrationStart)}</p>
      <p className="text-gray-700 mb-4"><strong>Start of Event:</strong> {formatDate(event.startOfEvent)}</p>
      <p className="text-gray-700 mb-4"><strong>End of Event:</strong> {formatDate(event.endOfEvent)}</p>
      <p className="text-gray-700 mb-4"><strong>Time of Event:</strong> {event.timeOfEvent}</p>
    </div>
  );
};

export default SingleEventPage;

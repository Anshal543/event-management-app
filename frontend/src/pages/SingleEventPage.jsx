import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleEvent } from '../features/events/eventSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const SingleEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, eventsLoading, eventsError } = useSelector((state) => state.events);
  const userId = useSelector((state) => state.auth.userInfo?.rest._id);

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  if (eventsLoading) return <div>Loading...</div>;
  if (eventsError) return <div>{eventsError}</div>;

  const event = events.find((event) => event._id === id);
  if (!event) return <div>Event not found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date ? date.toLocaleDateString() : 'N/A';
  };

  const formatTimeTo12Hour = (timeString) => {
    if (!timeString) return 'N/A';
    const [hour, minute] = timeString.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  };

  const handleRegister = async (eventId, userId) => {
    try {
      if (event.participants.includes(userId)) {
        toast.warning('You are already registered for this event!');
        return;
      }
      const response = await axios.post(`http://localhost:8080/api/v1/events/evt/${eventId}/register/${userId}`);
      toast.success('Registered in event successfully!');
      setTimeout(() => {
        navigate('/all-events');
      }, 2000);
    } catch (error) {
      toast.error('Error registering in event!');
    }
  };

  const handleRemoveEvent = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/events/delete/${eventId}`);
      toast.success('Event Deleted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      toast.error('Error Deleting event!');
    }
  };

  const handleUpdateEvent = () => {
    navigate(`/updateEvent/${event._id}`);
  };

  const shortenLink = (url) => {
    const maxLength = 30; // Max length for display
    if (url.length <= maxLength) return url;
    return `${url.substring(0, maxLength)}...`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">{event.title}</h2>
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4 shadow-lg" />
      )}
      <div className="space-y-4">
        <p className="text-gray-700"><strong className="font-semibold">Description:</strong> {event.description}</p>
        <p className="text-gray-700"><strong className="font-semibold">Type of Event:</strong> {event.typeOfEvent}</p>
        <p className="text-gray-700"><strong className="font-semibold">Location:</strong> <a href={event.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{shortenLink(event.location)}</a></p>
        {event.registrationFee !== 0 && <p className="text-gray-700"><strong className="font-semibold">Registration Fee:</strong> ${event.registrationFee}</p>}
        <p className="text-gray-700"><strong className="font-semibold">City:</strong> {event.city}</p>
        <p className="text-gray-700"><strong className="font-semibold">Registration Start:</strong> {formatDate(event.registrationStart)}</p>
        <p className="text-gray-700"><strong className="font-semibold">Start of Event:</strong> {formatDate(event.startOfEvent)}</p>
        <p className="text-gray-700"><strong className="font-semibold">End of Event:</strong> {formatDate(event.endOfEvent)}</p>
        <p className="text-gray-700"><strong className="font-semibold">Time of Event:</strong> {formatTimeTo12Hour(event.timeOfEvent)}</p>

        {event.typeOfCompetition && (
          <p className="text-gray-700"><strong className="font-semibold">Type of Competition:</strong> {event.typeOfCompetition}</p>
        )}
        {event.amountOfWinner !== 0 && (
          <p className="text-gray-700"><strong className="font-semibold">Amount of Winner:</strong> ${event.amountOfWinner}</p>
        )}
        {event.dateOfResult && (
          <p className="text-gray-700"><strong className="font-semibold">Date of Result:</strong> {formatDate(event.dateOfResult)}</p>
        )}
        {event.winner.length > 0 && (
          <div className="text-gray-700"><strong className="font-semibold">Winner:</strong> {event.winner[0]?.username}</div>
        )}
      </div>

      <div className="mt-6 flex justify-around">
        <button
          onClick={() => handleRegister(event._id, userId)}
          className='bg-blue-600 rounded-md text-white px-6 py-2 hover:bg-blue-500'
        >
          Register in Event
        </button>
        <button
          onClick={() => handleRemoveEvent(event._id)}
          className='bg-red-600 rounded-md text-white px-6 py-2 hover:bg-red-500'
        >
          Remove Event
        </button>
        <button
          onClick={() => handleUpdateEvent(event._id)}
          className='bg-green-600 rounded-md text-white px-6 py-2 hover:bg-green-500'
        >
          Update Event
        </button>
      </div>
    </div>
  );
};

export default SingleEventPage;

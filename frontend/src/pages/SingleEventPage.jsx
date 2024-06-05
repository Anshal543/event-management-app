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

  const userId = useSelector((state)=>state.auth.userInfo?.rest._id)
  
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
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };


  // 6656125ae9e5f80ee712076c
  const handleRegister = async(eventId,userId) => {
    try {
      console.log("enter handle re");
      if (event.participants.includes(userId)) {
        toast.warning('You are already registered for this event!');
        return; // Do not proceed with registration
      }
      const response = await axios.post(`http://localhost:8080/api/v1/events/evt/${eventId}/register/${userId}`);
      console.log(response.data);
      toast.success('Registered in event successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // navigate to home page after 2 seconds
    } catch (error) {
      toast.error('Error registering in event!');
    }
  }

  const HandleRemoveEvent = async(eventId) => {
    try {
      console.log("enter handle re");
      const response = await axios.delete(`http://localhost:8080/api/v1/events/delete/${eventId}`);
      console.log(response.data);
      toast.success('Event Deleted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // navigate to home page after 2 seconds
    } catch (error) {
      toast.error('Error Deleting event!');
    }
  }

  const handleUpdateEvent = () => {
    navigate(`/updateEvent/${event._id}`);
  };

  return (
    <>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4" />
      )}
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description}</p>
      <p className="text-gray-700 mb-4"><strong>Type of Event:</strong> {event.typeOfEvent}</p>
      {/* <p className="text-gray-700 mb-4"><strong>Location:</strong> {event.location}</p> */}
      <p>
        <strong>Location:</strong> <a href={event.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{event.location}</a>
      </p>
      <p className="text-gray-700 mb-4"><strong>Registration Fee:</strong> {event.registrationFee}</p>
      <p className="text-gray-700 mb-4"><strong>city:</strong> {event.city}</p>
      <p className="text-gray-700 mb-4"><strong>Registration Start:</strong> {formatDate(event.registrationStart)}</p>
      <p className="text-gray-700 mb-4"><strong>Start of Event:</strong> {formatDate(event.startOfEvent)}</p>
      <p className="text-gray-700 mb-4"><strong>End of Event:</strong> {formatDate(event.endOfEvent)}</p>
      <p className="text-gray-700 mb-4"><strong>Time of Event:</strong> {formatTime(event.timeOfEvent)}</p>
  
      <button
      onClick={()=>handleRegister(event._id,userId)}
       className=' bg-red-600 rounded-md  text-white p-4 hover:bg-red-500 '>Register in Event</button>
      <button
      onClick={()=>HandleRemoveEvent(event._id)}
       className=' bg-red-600 rounded-md  text-white p-4 hover:bg-red-500 '>Remove Event</button>
      <button
      onClick={()=>handleUpdateEvent(event._id)}
       className=' bg-red-600 rounded-md  text-white p-4 hover:bg-red-500 '>update event</button>
    
    </div>
    </>
  );
};

export default SingleEventPage;

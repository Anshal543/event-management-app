import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminButtons = ({ eventId }) => {
  const navigate = useNavigate();

  const handleRemoveEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/events/delete/${eventId}`);
      toast.success('Event Deleted successfully!');
      setTimeout(() => {
        navigate('/all-events');
      }, 2000);
    } catch (error) {
      toast.error('Error Deleting event!');
    }
  };

  const handleUpdateEvent = () => {
    navigate(`/updateEvent/${eventId}`);
  };

  const handleGetRegisteredUsers = () => {
    navigate(`/event/${eventId}/registered-users`);
  };

  return (
    <div className="flex flex-col space-y-2 mt-6">
      <button
        onClick={() => handleUpdateEvent(eventId)}
        className='bg-green-600 rounded-md text-white px-6 py-2 hover:bg-green-500'
      >
        Update Event
      </button>
      <button
        onClick={() => handleRemoveEvent(eventId)}
        className='bg-red-600 rounded-md text-white px-6 py-2 hover:bg-red-500'
      >
        Remove Event
      </button>
      <button
        onClick={() => handleGetRegisteredUsers(eventId)}
        className='bg-yellow-600 rounded-md text-white px-6 py-2 hover:bg-yellow-500'
      >
        Get Registered Users
      </button>
    </div>
  );
};

export default AdminButtons;

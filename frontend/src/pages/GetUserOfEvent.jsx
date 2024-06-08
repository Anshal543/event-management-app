import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEvent, selectEvents, selectEventsLoading, selectEventsError } from '../features/events/eventSlice';

const GetUserOfEvent = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const events = useSelector(selectEvents);
  const eventsLoading = useSelector(selectEventsLoading);
  const eventsError = useSelector(selectEventsError);
  const eventInfo = events.find(event => event._id === eventId);

  useEffect(() => {
    if (!eventInfo) {
      dispatch(getSingleEvent(eventId));
    }
  }, [dispatch, eventId, eventInfo]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_EVENTS_URL}/getRegisteredUsers/${eventId}`);
        
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [eventId]);

  if (loading || eventsLoading) {
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
      </div>
    );
  }

  if (error || eventsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-lg">Error: {error || eventsError}</div>
      </div>
    );
  }

  if (!eventInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Users for {eventInfo.title}</h1>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">Name</th>
                <th className="py-2 px-4 border-b text-center">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{user.username || 'N/A'}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-700 text-lg text-center">No users registered for this event.</div>
      )}
    </div>
  );
};

export default GetUserOfEvent;

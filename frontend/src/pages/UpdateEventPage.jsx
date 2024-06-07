import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    typeOfEvent: '',
    location: '',
    city: '',
    registrationFee: '',
    registrationStart: '',
    startOfEvent: '',
    endOfEvent: '',
    timeOfEvent: '',
    dateOfResult: '',
    amountOfWinner: '',
    typeOfCompetition: '',
    winner: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/events/event/${id}`);
        const eventData = response.data;
        eventData.registrationStart = eventData.registrationStart ? eventData.registrationStart.split('T')[0] : '';
        eventData.startOfEvent = eventData.startOfEvent ? eventData.startOfEvent.split('T')[0] : '';
        eventData.endOfEvent = eventData.endOfEvent ? eventData.endOfEvent.split('T')[0] : '';
        eventData.dateOfResult = eventData.dateOfResult ? eventData.dateOfResult.split('T')[0] : '';
        setEvent(eventData);
        setImagePreview(eventData.image);
      } catch (err) {
        setError('Could not fetch event data.');
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setEvent((prevEvent) => ({
        ...prevEvent,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in event) {
        if (event[key]) formData.append(key, event[key]);
      }
      await axios.patch(`http://localhost:8080/api/v1/events/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/single-event/${id}`);
    } catch (err) {
      setError('Failed to update event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Event</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Event Title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Event Description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="typeOfEvent" className="block text-gray-700 font-bold mb-2">Type of Event</label>
          <input
            type="text"
            id="typeOfEvent"
            name="typeOfEvent"
            value={event.typeOfEvent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Type of Event"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Location"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={event.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="City"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="registrationFee" className="block text-gray-700 font-bold mb-2">Registration Fee</label>
          <input
            type="number"
            id="registrationFee"
            name="registrationFee"
            value={event.registrationFee}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Registration Fee"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="registrationStart" className="block text-gray-700 font-bold mb-2">Registration Start</label>
          <input
            type="date"
            id="registrationStart"
            name="registrationStart"
            value={event.registrationStart}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startOfEvent" className="block text-gray-700 font-bold mb-2">Start of Event</label>
          <input
            type="date"
            id="startOfEvent"
            name="startOfEvent"
            value={event.startOfEvent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endOfEvent" className="block text-gray-700 font-bold mb-2">End of Event</label>
          <input
            type="date"
            id="endOfEvent"
            name="endOfEvent"
            value={event.endOfEvent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timeOfEvent" className="block text-gray-700 font-bold mb-2">Time of Event</label>
          <input
            type="time"
            id="timeOfEvent"
            name="timeOfEvent"
            value={event.timeOfEvent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dateOfResult" className="block text-gray-700 font-bold mb-2">Date of Result</label>
          <input
            type="date"
            id="dateOfResult"
            name="dateOfResult"
            value={event.dateOfResult}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amountOfWinner" className="block text-gray-700 font-bold mb-2">Amount of Winner</label>
          <input
            type="number"
            id="amountOfWinner"
            name="amountOfWinner"
            value={event.amountOfWinner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Amount of Winner"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="typeOfCompetition" className="block text-gray-700 font-bold mb-2">Type of Competition</label>
          <input
            type="text"
            id="typeOfCompetition"
            name="typeOfCompetition"
            value={event.typeOfCompetition}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Type of Competition"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="winnerEmail" className="block text-gray-700 font-bold mb-2">Winner Email</label>
          <input
            type="email"
            id="winner"
            name="winner"
            value={event.winner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Winner Email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Event" className="w-full h-64 object-cover rounded-md" />
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 bg-indigo-600 text-white font-bold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEventPage;

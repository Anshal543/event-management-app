import React, { useState } from 'react';
import axios from 'axios';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    typeOfEvent: '',
    location: '',
    registrationFee: '',
    registrationStart: '',
    startOfEvent: '',
    endOfEvent: '',
    timeOfEvent: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:8080/api/v1/events/create', data);
      console.log(response.data); // handle successful response
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type of Event:</label>
          <input type="text" name="typeOfEvent" value={formData.typeOfEvent} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Fee:</label>
          <input type="text" name="registrationFee" value={formData.registrationFee} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Start:</label>
          <input type="date" name="registrationStart" value={formData.registrationStart} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start of Event:</label>
          <input type="date" name="startOfEvent" value={formData.startOfEvent} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End of Event:</label>
          <input type="date" name="endOfEvent" value={formData.endOfEvent} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time of Event:</label>
          <input type="time" name="timeOfEvent" value={formData.timeOfEvent} onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div>
          <button type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;

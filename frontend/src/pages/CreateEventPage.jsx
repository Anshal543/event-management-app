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
  const [thumbnail, setThumbnail] = useState(null);


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
    }  formData.append('thumbnail', thumbnail);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/events/create', data);
      console.log(response.data); // handle successful response
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);  // Directly set the file
      const tempUrl = URL.createObjectURL(file);
      setThumbnail(tempUrl);  // Preview image
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
          {/* {isLoading && <p>Loading...</p>} */}
          {thumbnail && <img src={thumbnail} alt="thumbnail" className="mt-2 h-32 w-32 object-cover rounded-md" />}
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

/*
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append('thumbnail', thumbnail);  // Append the file

      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/events`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201) {
        toast.success("Event created successfully");
        navigate('/');
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    }
  };

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);  // Directly set the file
      const tempUrl = URL.createObjectURL(file);
      setThumbnail(tempUrl);  // Preview image
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && <p className="text-red-600">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            {...register('time', { required: 'Time is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.time && <p className="text-red-600">{errors.time.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            placeholder="Enter map location"
            {...register('location', { required: 'Location is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.location && <p className="text-red-600">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            {...register('address', { required: 'Address is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.address && <p className="text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.city && <p className="text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register('contact.phone')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('contact.email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Entered value does not match email format'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.contact?.email && <p className="text-red-600">{errors.contact.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Volunteers</label>
          <input
            type="number"
            {...register('NumberOfVolunteer', { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            onChange={uploadPhoto}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          {isLoading && <p>Loading...</p>}
          {thumbnail && <img src={thumbnail} alt="thumbnail" className="mt-2 h-32 w-32 object-cover rounded-md" />}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventForm;
*/

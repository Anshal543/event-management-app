import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const eventSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  typeOfEvent: z.string().nonempty("Type of Event is required"),
  location: z.string().nonempty("Location is required"),
  registrationFee: z.number().min(0, "Registration Fee must be a positive number"),
  registrationStart: z.string().nonempty("Registration Start is required"),
  startOfEvent: z.string().nonempty("Start of Event is required"),
  endOfEvent: z.string().nonempty("End of Event is required"),
  timeOfEvent: z.string().nonempty("Time of Event is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required"),
});

const CreateEventPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: zodResolver(eventSchema),
  });
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:8080/api/v1/events/create', data);
      toast.success('Event created successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // navigate to home page after 2 seconds
    } catch (error) {
      toast.error('Error creating event!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file); // Update the form data with the file
    setThumbnail(URL.createObjectURL(file)); // Set the thumbnail for preview
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type of Event:</label>
          <input
            type="text"
            {...register("typeOfEvent")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.typeOfEvent && <p className="text-red-500 text-sm">{errors.typeOfEvent.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            {...register("location")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Fee:</label>
          <input
            type="number"
            {...register("registrationFee", { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.registrationFee && <p className="text-red-500 text-sm">{errors.registrationFee.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Start:</label>
          <input
            type="date"
            {...register("registrationStart")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.registrationStart && <p className="text-red-500 text-sm">{errors.registrationStart.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start of Event:</label>
          <input
            type="date"
            {...register("startOfEvent")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.startOfEvent && <p className="text-red-500 text-sm">{errors.startOfEvent.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End of Event:</label>
          <input
            type="date"
            {...register("endOfEvent")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.endOfEvent && <p className="text-red-500 text-sm">{errors.endOfEvent.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time of Event:</label>
          <input
            type="time"
            {...register("timeOfEvent")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.timeOfEvent && <p className="text-red-500 text-sm">{errors.timeOfEvent.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {thumbnail && (
          <div>
            <img src={thumbnail} alt="thumbnail" className="mt-2 h-32 w-32 object-cover rounded-md" />
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;


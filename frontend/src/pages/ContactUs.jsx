import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  email: z.string().email("Please provide a valid email"),
  subject: z.string().min(5, "Subject must contain at least 5 characters"),
  message: z.string().min(10, "Message must contain at least 10 characters"),
});

function ContactUs() {
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.auth.userInfo?.rest._id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const checkUser = async () => {
      // Simulate checking cookies or local storage for user info
      const user = userInfo; // Replace with actual cookie/local storage check if needed
      if (!user) {
        window.location.href = "/login";
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [userInfo]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_CONTACTS_URL}/contact-us`, data);
      setResponseMessage(response.data.message);
      reset();
      toast.success(response.data.message);
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      setResponseMessage(message);
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              {...register('name')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register('email')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              {...register('subject')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              {...register('message')}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {responseMessage && <p className="mt-4 text-center text-red-500">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default ContactUs;

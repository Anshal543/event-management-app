import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfilePage = () => {
  const { id } = useParams(); // Get the user id from the URL
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}/user-details/${id}`);
        setUserDetails(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 mb-4"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-gray-500">Please wait while we fetch your profile details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
          <p className="text-gray-500">An error occurred while fetching your profile details. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No user details available</h2>
          <p className="text-gray-500">It seems like we couldn't find your profile details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-gray-700">{userDetails.user.username}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700">{userDetails.user.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Mobile Number</h2>
            <p className="text-gray-700">{userDetails.user.mobileNo}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate(`/user-profile/${id}/update`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

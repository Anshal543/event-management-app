// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getSingleEvent } from '../features/events/eventSlice';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import AdminButtons from '../components/utils/AdminButtons'; // Import the new AdminButtons component

// const SingleEventPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { events, eventsLoading, eventsError } = useSelector((state) => state.events);
//   const userId = useSelector((state) => state.auth.userInfo?.rest._id);
//   const isAdmin = useSelector((state) => state.auth.userInfo?.rest.isAdmin); // Assuming this is the admin flag

//   useEffect(() => {
//     dispatch(getSingleEvent(id));
//   }, [dispatch, id]);

//   useEffect(()=>{
//     if(!userId) navigate('/login')
//   },[userId])

//   if (eventsLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (eventsError) {
//     return <div className="text-red-500 text-center mt-4">{eventsError}</div>;
//   }

//   const event = events.find((event) => event._id === id);
//   if (!event) return <div className="text-red-500 text-center mt-4">Event not found</div>;

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date ? date.toLocaleDateString() : 'N/A';
//   };

//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString) return 'N/A';
//     const [hour, minute] = timeString.split(':').map(Number);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const hour12 = hour % 12 || 12;
//     const formattedTime = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
//     return formattedTime;
//   };

//   const handleRegister = async (eventId, userId) => {
//     try {
//       await axios.post(`http://localhost:8080/api/v1/events/evt/${eventId}/register/${userId}`);
//       toast.success('Registered in event successfully!');
//       setTimeout(() => {
//         navigate('/all-events');
//       }, 2000);
//     } catch (error) {
//       toast.error('Error registering in event!');
//     }
//   };

//   const handleLeave = async (eventId, userId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/v1/events/evt/${eventId}/leave/${userId}`);
//       toast.success('Left the event successfully!');
//       setTimeout(() => {
//         navigate('/all-events');
//       }, 2000);
//     } catch (error) {
//       toast.error('Error leaving the event!');
//     }
//   };

//   const handleDisabledClick = (message) => {
//     toast.info(message);
//   };

//   const shortenLink = (url) => {
//     const maxLength = 30; // Max length for display
//     if (url.length <= maxLength) return url;
//     return `${url.substring(0, maxLength)}...`;
//   };

//   const isRegistered = event.participants.includes(userId);
//   const currentDate = new Date();
//   const registrationEndDate = new Date(event.startOfEvent);
//   const registrationOver = currentDate > registrationEndDate;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
//       <h2 className="text-3xl font-bold mb-4 text-center">{event.title}</h2>
//       {event.image && (
//         <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4 shadow-lg" />
//       )}
//       <div className="space-y-4">
//         <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">Description:</strong> {event.description}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">Type of Event:</strong> {event.typeOfEvent}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Location:</strong> <a href={event.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{shortenLink(event.location)}</a></p>
//         {event.registrationFee !== 0 && <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Registration Fee:</strong> ${event.registrationFee}</p>}
//         <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">City:</strong> {event.city}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Registration Start:</strong> {formatDate(event.registrationStart)}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Start of Event:</strong> {formatDate(event.startOfEvent)}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">End of Event:</strong> {formatDate(event.endOfEvent)}</p>
//         <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Time of Event:</strong> {formatTimeTo12Hour(event.timeOfEvent)}</p>

//         {event.typeOfCompetition && (
//           <p className="text-gray-700 bg-gray-100 p-2 capitalize rounded"><strong className="font-semibold">Type of Competition:</strong> {event.typeOfCompetition}</p>
//         )}
//         {event.amountOfWinner !== 0 && (
//           <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Amount of Winner:</strong> ${event.amountOfWinner}</p>
//         )}
//         {event.dateOfResult && (
//           <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Date of Result:</strong> {formatDate(event.dateOfResult)}</p>
//         )}
//         {event.winner.length > 0 && (
//           <div className="text-gray-700 bg-gray-100 p-2 capitalize rounded"><strong className="font-semibold">Winner:</strong> {event.winner[0]?.username}</div>
//         )}
//       </div>

//       <div className="mt-6 flex flex-col items-center space-y-4">
//         {isRegistered ? (
//           <button
//             onClick={() => registrationOver ? handleDisabledClick('Registration is closed, you cannot leave the event.') : handleLeave(event._id, userId)}
//             className={`bg-red-600 rounded-md text-white px-6 py-2 hover:bg-red-500 ${registrationOver ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={registrationOver}
//           >
//             Leave Event
//           </button>
//         ) : (
//           <button
//             onClick={() => registrationOver ? handleDisabledClick('Registration is closed, you cannot register for the event.') : handleRegister(event._id, userId)}
//             className={`bg-blue-600 rounded-md text-white px-6 py-2 hover:bg-blue-500 ${registrationOver ? 'opacity-50 cursor-not-allowed' : ''}`}
//             disabled={registrationOver}
//           >
//             Register in Event
//           </button>
//         )}
//         {isAdmin && <AdminButtons eventId={event._id} userId={userId} />} {/* Include the AdminButtons component */}
//       </div>
//     </div>
//   );
// };

// export default SingleEventPage;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleEvent } from '../features/events/eventSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminButtons from '../components/utils/AdminButtons'; // Import the new AdminButtons component

const SingleEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, eventsLoading, eventsError } = useSelector((state) => state.events);
  const userId = useSelector((state) => state.auth.userInfo?.rest._id);
  const isAdmin = useSelector((state) => state.auth.userInfo?.rest.isAdmin); // Assuming this is the admin flag

  useEffect(() => {
    if (!userId) {
      toast.info('Please log in to view event details.');
      navigate('/login');
      return;
    }
    dispatch(getSingleEvent(id));
  }, [dispatch, id, userId, navigate]);

  if (eventsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (eventsError) {
    return <div className="text-red-500 text-center mt-4">{eventsError}</div>;
  }

  const event = events.find((event) => event._id === id);
  if (!event) return <div className="text-red-500 text-center mt-4">Event not found</div>;

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
      await axios.post(`http://localhost:8080/api/v1/events/evt/${eventId}/register/${userId}`);
      toast.success('Registered in event successfully!');
      setTimeout(() => {
        navigate('/all-events');
      }, 2000);
    } catch (error) {
      toast.error('Error registering in event!');
    }
  };

  const handleLeave = async (eventId, userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/events/evt/${eventId}/leave/${userId}`);
      toast.success('Left the event successfully!');
      setTimeout(() => {
        navigate('/all-events');
      }, 2000);
    } catch (error) {
      toast.error('Error leaving the event!');
    }
  };

  const handleDisabledClick = (message) => {
    toast.info(message);
  };

  const shortenLink = (url) => {
    const maxLength = 30; // Max length for display
    if (url.length <= maxLength) return url;
    return `${url.substring(0, maxLength)}...`;
  };

  // const isRegistered = event.participants.map((participant) => participant.userId)===(userId);
  const isRegistered = event.participants.includes(userId);

  const currentDate = new Date();
  const registrationEndDate = new Date(event.startOfEvent);
  const registrationOver = currentDate > registrationEndDate;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">{event.title}</h2>
      {event.image && (
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md mb-4 shadow-lg" />
      )}
      <div className="space-y-4">
        <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">Description:</strong> {event.description}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">Type of Event:</strong> {event.typeOfEvent}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Location:</strong> <a href={event.location} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{shortenLink(event.location)}</a></p>
        {event.registrationFee !== 0 && <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Registration Fee:</strong> ${event.registrationFee}</p>}
        <p className="text-gray-700 bg-gray-100 p-2 rounded capitalize"><strong className="font-semibold">City:</strong> {event.city}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Registration Start:</strong> {formatDate(event.registrationStart)}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Start of Event:</strong> {formatDate(event.startOfEvent)}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">End of Event:</strong> {formatDate(event.endOfEvent)}</p>
        <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Time of Event:</strong> {formatTimeTo12Hour(event.timeOfEvent)}</p>

        {event.typeOfCompetition && (
          <p className="text-gray-700 bg-gray-100 p-2 capitalize rounded"><strong className="font-semibold">Type of Competition:</strong> {event.typeOfCompetition}</p>
        )}
        {event.amountOfWinner > 0 && (
          <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Amount of Winner:</strong> ${event.amountOfWinner}</p>
        )}
        {event.dateOfResult && (
          <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Date of Result:</strong> {formatDate(event.dateOfResult)}</p>
        )}
        {event.winner.length > 0 && (
          <div className="text-gray-700 bg-gray-100 p-2 capitalize rounded"><strong className="font-semibold">Winner:</strong> {event.winner[0]?.username}</div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center space-y-4">
        {isRegistered ? (
          <button
            onClick={() => registrationOver ? handleDisabledClick('Registration is closed, you cannot leave the event.') : handleLeave(event._id, userId)}
            className={`bg-red-600 rounded-md text-white px-6 py-2 hover:bg-red-500 ${registrationOver ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={registrationOver}
          >
            Leave Event
          </button>
        ) : (
          <button
            onClick={() => registrationOver ? handleDisabledClick('Registration is closed, you cannot register for the event.') : handleRegister(event._id, userId)}
            className={`bg-blue-600 rounded-md text-white px-6 py-2 hover:bg-blue-500 ${registrationOver ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={registrationOver}
          >
            Register in Event
          </button>
        )}
        {isAdmin && <AdminButtons eventId={event._id} userId={userId} />} {/* Include the AdminButtons component */}
      </div>
    </div>
  );
};

export default SingleEventPage;

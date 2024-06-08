import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, selectEvents } from "../features/events/eventSlice";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleViewDetails = (id) => {
    navigate(`/single-event/${id}`);
  };

  const currentDate = new Date();

  // Check if events is an array
  const upcomingEvents = Array.isArray(events) 
    ? events.filter(event => new Date(event.startOfEvent) > currentDate)
    : [];
  const otherEvents = Array.isArray(events) 
    ? events.filter(event => new Date(event.startOfEvent) <= currentDate)
    : [];

  const sortedEvents = [
    ...upcomingEvents.sort((a, b) => new Date(a.startOfEvent) - new Date(b.startOfEvent)),
    ...otherEvents
  ];

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 pt-4 pb-16">
      {!Array.isArray(events) || events.length === 0 ? (
        <div className="flex flex-col items-center">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 pb-16 mt-10">
          {sortedEvents.map((event) => {
            const eventDate = new Date(event.startOfEvent);
            const isUpcoming = currentDate < eventDate;
            const isActive = currentDate >= eventDate && currentDate <= new Date(event.endOfEvent);
            const isCompetition = event.typeOfCompetition;

            return (
              <div
                key={event._id}
                className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white"
              >
                {isUpcoming && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    Upcoming
                  </div>
                )}
                {isActive && !isUpcoming && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    Active
                  </div>
                )}
                {isCompetition && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                    Competition
                  </div>
                )}
                <img
                  className="w-full h-48 object-cover"
                  src={event.image}
                  alt={event.title}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 truncate capitalize">
                    {event.title}
                  </div>
                  <p className="text-gray-700 text-base mb-4 line-clamp-2 min-h-[3rem]">
                    {event.description}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 capitalize font-bold text-lg">
                      {event.city}
                    </p>
                    {event.registrationFee > 0 && (
                      <p className="text-gray-500 capitalize font-bold text-lg">
                         Fee: {event.registrationFee}
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                  <button
                    onClick={() => handleViewDetails(event._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                  {event.participants.length > 0 && (
                    <p className="text-gray-500 capitalize font-bold text-lg">
                      Registered: {event.participants.length}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainPage;

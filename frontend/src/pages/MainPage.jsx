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

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-4">
      {!events.length ? (
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
        <div className="flex flex-wrap justify-start sm:justify-center">
          {events.map((event, index) => {
            const currentDate = new Date();
            const eventDate = new Date(event.startOfEvent);
            const isUpcoming = currentDate < eventDate;

            return (
              <div
                key={event.id}
                className={`relative max-w-sm rounded overflow-hidden shadow-lg m-4 ${
                  events.length === 1 && index === 0 ? "self-start" : ""
                }`}
              >
                {isUpcoming && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                    Upcoming
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
                  <p className="text-gray-700 text-base mb-4 truncate">
                    {event.description}
                  </p>
                  <p className="text-gray-500 capitalize font-bold text-lg">{event.city}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <button
                    onClick={() => handleViewDetails(event._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Details
                  </button>
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

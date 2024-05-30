import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, selectEvents } from "../features/events/eventSlice";

const events = [
  {
    id: 1,
    title: "Event 1",
    description: "Description for Event 1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Event 2",
    description: "Description for Event 2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Event 3",
    description: "Description for Event 3",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Event 4",
    description: "Description for Event 4",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Event 5",
    description: "Description for Event 5",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const MainPage = () => {
  const events = useSelector(selectEvents)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getEvents())
  },[])

  return (
    <div className="flex flex-wrap justify-start sm:justify-center">
      {events.map((event, index) => (
        <div key={event.id} className={` min-w-xl  rounded overflow-hidden shadow-lg m-4 ${events.length === 1 && index === 0 ? 'self-start' : ''}`}>
          <img className="w-full" src={event.image} alt={event.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{event.title}</div>
            <p className="text-gray-700 text-base">{event.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;

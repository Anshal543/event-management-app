import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import concert from '../assets/concert.jpg';
import educative from '../assets/educative.jpg';
import tech from '../assets/tech.jpg';

const HeroSection = () => {
  const backgroundImages = [
    `url(${concert})`,
    `url(${educative})`,
    `url(${tech})`,
  ];

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  return (
    <div>
      <div 
        className="flex flex-col items-center justify-center h-screen text-center p-6" 
        style={{ 
          backgroundImage: backgroundImage, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-lg">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Welcome to Pakistan's Best Event Management Platform
          </h1>
          <p className="text-lg mb-8 text-gray-300">
            Discover the ultimate solution for all your event management needs. Our platform provides top-notch services to ensure your events are a resounding success. From planning to execution, we handle it all with precision and professionalism.
          </p>
          <Link to="/all-events" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
            Get Started
          </Link>
        </div>
      </div>

      {/* New Section */}
      <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">
          Why Choose Us?
        </h2>
        <p className="text-lg mb-4 text-gray-700">
          Our platform offers unmatched services tailored to your needs.
        </p>
        <ul className="text-left list-disc list-inside mb-6 text-gray-700">
          <li>Professional event planning</li>
          <li>Customized solutions</li>
          <li>24/7 customer support</li>
          <li>Experienced team</li>
        </ul>
        {/* <Link to="/about-us" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
          Learn More
        </Link> */}
      </div>
    </div>
  );
}

export default HeroSection;

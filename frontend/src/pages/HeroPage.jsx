// src/components/HeroSection.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const backgroundImages = [
    'url("https://source.unsplash.com/random/1600x900?event")',
    'url("https://source.unsplash.com/random/1600x900?party")',
    'url("https://source.unsplash.com/random/1600x900?conference")',
    'url("https://source.unsplash.com/random/1600x900?wedding")'
  ];

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6" style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-black bg-opacity-50 p-10 rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Welcome to Pakistan's Best Event Management Platform
        </h1>
        <p className="text-lg mb-8 text-gray-300">
          Discover the ultimate solution for all your event management needs. Our platform provides top-notch services to ensure your events are a resounding success. From planning to execution, we handle it all with precision and professionalism.
        </p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300" >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;

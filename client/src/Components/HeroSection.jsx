import React from "react";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { assets } from "../assets/assets";

const HeroSection = () => {
  const {userData} = useContext(AppContent);
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-4 py-10">
      <img
        src={assets.header_img}
        alt="Robot"
        className="w-32 h-32 mb-6 rounded-full shadow-md"
      />
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Hey {userData ? userData.name : "Developer"}!
        <span className="wave">👋</span>
      </h2>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
        Welcome to our app
      </h1>
      <p className="text-gray-600 mt-4 max-w-md text-sm md:text-base">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="mt-8 px-6 py-3 border border-gray-400 bg-white/80 hover:bg-gray-100 rounded-full text-sm transition shadow">
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;

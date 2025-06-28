import React from "react";
import Navbar from "../Components/Navbar";
import HeroSection from "../Components/HeroSection";

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[url('./bg_img.png')] bg-gradient-to-tr from-white via-indigo-50 to-purple-50">
      <Navbar />
      <HeroSection/>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);
  const sendVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };
  const navigate = useNavigate();
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      data.success && setUserData(false);
      data.success && setIsLoggedin(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-30 bg-transparent text-gray-700 transition-all">
      <a href="#">
        <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
      </a>

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-8 right-0 z-10 text-black rounded-lg p-2 bg-white border border-gray-300 shadow-lg min-w-[150px]">
            <ul className="list-none space-y-1">
              {!userData.isAccountverified && (
                <li onClick={sendVerifyOtp} className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="px-4 py-2 rounded hover:bg-gray-100 cursor-pointer transition-colors text-red-600/80"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          type="button"
          className="mt-8 px-6 py-3 md:flex items-center justify-center gap-2 text-sm bg-white/80 hover:bg-gray-100 border border-gray-300 rounded-full backdrop-blur-md transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;

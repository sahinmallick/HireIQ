import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContent);
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && (e.target.value === "") & (index > 0)) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePast = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("").toString();
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    isLoggedin && userData && userData.isAccountverified && navigate("/");
  }, [isLoggedin, userData]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-tr from-white via-indigo-50 to-purple-50">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="">
        <form
          onSubmit={onSubmit}
          className="bg-white text-gray-500 relative flex items-center flex-col max-w-96 mx-4 md:px-8 md:py-10 p-6 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 transition-all"
        >
          <img
            className="h-16 w-16 absolute -top-8 self-center"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/otp/privacyIcon.png"
            alt="privacyIcon"
          />
          <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800 mt-6">
            Two-factor Authentication
          </h2>
          <p className="mb-6 text-center">
            Please enter the authentication code
          </p>

          <div
            className="flex items-center justify-between mb-6 w-full"
            onPaste={handlePast}
          >
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500 transition duration-300"
                  type="text"
                  maxLength="1"
                  required
                  ref={(el) => (inputRefs.current[i] = el)}
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
          </div>

          {/* <div className="flex items-center w-full gap-2 my-2">
            <input type="checkbox" id="accept" className="accent-indigo-500" />
            <label htmlFor="accept">Trust this device</label>
          </div> */}

          <button
            type="submit"
            className="w-full mt-2 bg-gray-800 py-2.5 rounded-lg text-white font-semibold hover:bg-gray-900 transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;

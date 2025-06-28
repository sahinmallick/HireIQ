import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isMailSend, setIsMailSend] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
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
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsMailSend(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value).join("");
    setOtp(otpArray);
    setIsOtpSubmited(true);
  };
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-tr from-white via-indigo-50 to-purple-50">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      {/* Enter Email Id */}
      {!isMailSend && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Forget Password?
          </h2>

          <label htmlFor="email">Email</label>
          <div className="border border-gray-200 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded mt-1">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              value={email}
              className="outline-none"
              type="email"
              placeholder="Enter your Email id"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full my-3 bg-gray-800 active:scale-95 transition py-2.5 rounded text-white cursor-pointer"
          >
            Send Email
          </button>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Signup Now
            </span>
          </p>
        </form>
      )}

      {/* Enter OTP */}
      {!isOtpSubmited && isMailSend && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-white text-gray-500 relative flex items-center flex-col w-96 mx-4 md:px-8 md:py-10 p-6 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 transition-all"
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

          <button
            type="submit"
            className="w-full mt-2 bg-gray-800 py-2.5 rounded-lg text-white font-semibold hover:bg-gray-900 transition duration-300"
          >
            Verify
          </button>
        </form>
      )}

      {/* Enter New Password */}
      {isOtpSubmited && isMailSend && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-white text-gray-500 w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            New Password?
          </h2>

          <label htmlFor="password">Password</label>
          <div className="border border-gray-200 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded mt-1">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              id="password"
              value={newPassword}
              className="outline-none"
              type="password"
              placeholder="Enter your new Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full my-3 bg-gray-800 active:scale-95 transition py-2.5 rounded text-white"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

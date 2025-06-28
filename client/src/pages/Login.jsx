import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (state === "Sign Up") {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-tr from-white via-indigo-50 to-purple-50">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="flex flex-col justify-center items-center gap-4 m-auto p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white transition-all">
        <h2 className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User </span>{" "}
          {state == "Sign Up" ? "Sign Up" : "Login"}
        </h2>
        <p>
          {state == "Sign Up"
            ? "Create Your Account"
            : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" ? (
            <div className="border border-gray-200 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          ) : (
            ""
          )}
          <div className="border border-gray-200 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="border border-gray-200 mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="mt-5 text-left text-indigo-500">
            <span
              className="text-sm cursor-pointer"
              onClick={() => {
                navigate("/reset-password");
              }}
            >
              Forgot password?
            </span>
          </div>
          <button
            type="submit"
            className="cursor-pointer mt-2 w-full h-11 rounded-md text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {state == "Sign Up" ? "Sign Up" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p className="text-center mt-4">
              Already have an account?{" "}
              <a
                onClick={() => {
                  setState("login");
                }}
                className="text-blue-500 cursor-pointer"
              >
                Login Now
              </a>
            </p>
          ) : (
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a
                onClick={() => {
                  setState("Sign Up");
                }}
                className="text-indigo-500 cursor-pointer"
                href="#"
              >
                Signup Now
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

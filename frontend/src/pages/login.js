import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import { useOwnStore } from "../store/store";

export function Login() {
  const { setUser } = useOwnStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(response?.data?.user);
      //setting cookie to localSToarge
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
      // Assuming your API returns an error property in case of authentication failure
      toast.success("logged in successfully", {
        duration: "4000",
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("authentication failed please try again", {
        duration: "4000",
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <div class="h-screen md:flex">
        <div class="relative overflow-hidden md:flex w-1/2 gradient i justify-around items-center hidden">
          <div>
            <h1 class="text-white font-bold text-4xl font-sans">Blog</h1>
            <p class="text-white mt-1">
              The most popular peer to peer lending at SEA
            </p>
            <NavLink
              class="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              to="/"
            >
              Read Blogs
            </NavLink>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white space-y-10" onSubmit={handleSubmit}>
            {/* ... */}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* ... */}
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {/* ... */}
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <NavLink
              className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
              to="/register"
            >
              Not Registered yet?
            </NavLink>
          </form>
        </div>
      </div>
    </>
  );
}

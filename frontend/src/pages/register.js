import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { BsImage } from "react-icons/bs";
import { useDropzone } from "react-dropzone";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setUserData({ ...userData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setUserData({ ...userData, password: e.target.value });
    setPasswordMatchError(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    multiple: false,
    onDrop: (accepted) => {
      setProfilePic(accepted[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    // Create FormData to send with the request

    try {
      // Display the form data before submitting (for debugging)
      console.log("registration data before submitting", userData);

      // Upload the profile picture to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData?.append("file", profilePic);
      cloudinaryData?.append("upload_preset", "pwx98bx9");
      cloudinaryData?.append("cloud_name", "dguxr8mtj");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dguxr8mtj/image/upload",
        cloudinaryData
      );

      if (cloudinaryResponse.status === 200) {
        // Extract the Cloudinary image URL from the response
        const imageUrl = cloudinaryResponse?.data?.secure_url;

        // Display Cloudinary response (for debugging)
        console.log("Cloudinary response:", cloudinaryResponse);

        // Add the Cloudinary image URL to the form data

        setProfilePicUrl(imageUrl);

        // Update the userData state with the profilePicUrl
        setUserData({ ...userData, profilePicUrl: imageUrl });
        // Submit the form data to your server for registration

        console.log(
          "registration data before submitting",
          userData,
          profilePicUrl
        );
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/register`,
          userData,
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Registration success response:", res);
        toast.success(res?.data?.message, {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        navigate("/");
      }

      // Display registration success response (for debugging)
    } catch (error) {
      console.error("Error during registration:", error);
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
              to="/register"
            >
              Signup to create blogs and start your blogging journey today
            </NavLink>
          </div>
          <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form class="bg-white" onSubmit={handleSubmit}>
            <h1 class="text-gray-800 font-bold text-2xl mb-1">Register</h1>
            <p class="text-sm font-normal text-gray-600 mb-7">
              Start your blog journey
            </p>
            <div {...getRootProps()} className="mb-4">
              <input {...getInputProps()} />
              {profilePic ? (
                <div className="flex items-center py-2 px-3 rounded-2xl mb-4 justify-center">
                  <img
                    className="w-20 h-20 rounded-full flex items-center border-2"
                    src={URL.createObjectURL(profilePic)}
                    alt="Selected profilePic"
                  />
                </div>
              ) : (
                <label className="flex items-center border-2 py-2 px-3 rounded-2xl justify-center cursor-pointer">
                  <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg
                      class="absolute w-12 h-12 text-gray-400 -left-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <span className="pl-2 outline-none border-none">
                    choose profilePic
                  </span>
                </label>
              )}
            </div>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="name"
                id="name"
                placeholder="Username"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div class="flex items-center border-2 py-2 px-3 mt-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {passwordMatchError && (
              <p className="text-red-500 text-sm mb-4">
                Passwords do not match.
              </p>
            )}

            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

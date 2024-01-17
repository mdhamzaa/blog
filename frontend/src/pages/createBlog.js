import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Editor from "../components/editer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useOwnStore } from "../store/store";

export const CreateBlog = () => {
  const { user } = useOwnStore();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [blogImageUrl, setBlogImageUrl] = useState("");

  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    multiple: false,
    onDrop: (accepted) => {
      setFiles(accepted);
      setBlogImageUrl(URL.createObjectURL(accepted[0]));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Check if an image is selected
      if (files.length > 0) {
        // Upload the image to Cloudinary
        const cloudinaryData = new FormData();
        cloudinaryData?.append("file", files[0]);
        cloudinaryData?.append("upload_preset", "pwx98bx9");
        cloudinaryData?.append("cloud_name", "dguxr8mtj");

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dguxr8mtj/image/upload",
          cloudinaryData
        );

        if (cloudinaryResponse.status === 200) {
          // Extract the Cloudinary image URL from the response
          const imageUrl = cloudinaryResponse?.data?.secure_url;
          setBlogImageUrl(imageUrl);
        }

        console.log("calling user before creating blog data", user);
        const blogData = {
          title,
          summary,
          content,
          blogImageUrl,
          author: user._id,
        };

        console.log("calling blogadata before uploading", blogData);
        // Submit the blog data to your server
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER}/createBlog`,
          blogData,
          {
            withCredentials: true, // to include the cookie value
          }
        );

        if (response.status === 201) {
          toast.success("Blog created successfully", {
            duration: 4000,
            position: "bottom-right",
          });
          navigate("/");
        }
      }

      // Create the blog data
    } catch (error) {
      toast.error("Error creating blog", {
        duration: 4000,
        position: "bottom-right",
      });
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="container max-w-screen-lg mx-auto rounded-3xl shadow-2xl p-10 mt-20">
      <h1 className="text-3xl mb-4 font-bold mt-20 unique-title">
        Create Blog
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div {...getRootProps()} className="border p-3 rounded-md">
          {blogImageUrl ? (
            <div className="flex w-full justify-start">
              <img
                src={blogImageUrl}
                alt="Selected"
                className="w-36 h-36 rounded-md"
              />
            </div>
          ) : (
            <div className="border-gray-300 rounded-md bg-gray-200 flex align-middle justify-center w-36 h-36">
              <p>Drag & drop an image here, or click to select one</p>
            </div>
          )}
          <input {...getInputProps()} />
        </div>

        <label htmlFor="title" className="text-lg uppercase font-bold">
          Title
        </label>
        <input
          type="title"
          id="title"
          className="border border-gray-300 rounded-md p-2 bg-gray-200"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <label htmlFor="summary" className="text-lg uppercase font-bold">
          Summary
        </label>
        <input
          type="summary"
          id="summary"
          className="border border-gray-300 rounded-md p-2 bg-gray-200 "
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />

        <label htmlFor="content" className="uppercase text-lg font-bold">
          Content
        </label>
        <textarea
          type="textarea"
          id="content"
          placeholder="Write blog content here"
          className="border border-gray-300 rounded-md p-2 bg-gray-200"
          onChange={(ev) => setContent(ev.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

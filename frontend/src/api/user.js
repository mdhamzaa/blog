import axios from "axios";

export const registerUser = async (name, email, password, file) => {
  try {
    if (!name || !email || !password || !file) {
      throw new Error("Please enter all fields");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);

    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/register`,
      formData
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Please enter all fields");
    }

    const res = await axios.post(`${process.env.REACT_APP_SERVER}/login`, {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/logout`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (name, file) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER}/updateProfile`,
      formData
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/userProfile`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

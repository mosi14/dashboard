import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

API.interceptors.request.use((config) => {
    const userData = localStorage.getItem("user"); // Ensure we fetch latest data
    const token = userData ? JSON.parse(userData).accessToken : null;
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage!");
    }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;

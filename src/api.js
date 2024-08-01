import axios from 'axios';

const API = axios.create({
  baseURL: 'https://movie-app-backend-vbs8.onrender.com', 
});

// Add a request interceptor to include token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

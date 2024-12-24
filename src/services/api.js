// src/api.js
import axios from 'axios';

const api = axios.create({
   // baseURL: 'https://final-attendance.onrender.com/api', // Your backend API base URL
    baseURL: 'http://localhost:8080/api',
});

export default api;

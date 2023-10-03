import axios from 'axios';

const access = localStorage.getItem("access_token");

const axiosInstance = axios.create({

    
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // Set the Authorization header with the access token
    Authorization: `Bearer ${access}`, // Make sure 'access' is defined
  },
  withCredentials: true, // Include this line if you want to send cookies with the request
});
export default axiosInstance; // Export the custom Axios instance
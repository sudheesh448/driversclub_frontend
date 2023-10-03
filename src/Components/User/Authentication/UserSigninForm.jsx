import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import logo from './../../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import {login} from './../../Redux/authActions'
import { useSelector } from 'react-redux';



const UserSigninForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("sign in page ",isAuthenticated)
  const userData = useSelector((state) => state.auth.userData);
  
  console.log("Sign in page")
  console.log(userData)
  const isDriver = localStorage.getItem("is_driver");

  useEffect(() => {
    // Check the authentication status when the component mounts
    if (isAuthenticated=='true') {
      
      if (isDriver=='false'){
        // Navigate to the home page if authenticated and not a driver
        navigate('/');
      }
      else if (isDriver=='true'){
        navigate('/driver/home');
      }
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).then((response) => {
        // Handle success and redirection here, if needed
        
        const isDriver = localStorage.getItem('driver');
        console.log('Authentication successful:',response.status);
        
      });
    } catch (error) {
      // Handle authentication errors here
      console.error('Authentication failed login page:', error);
      // You can show an error message to the user if needed
    }
  };
      

  return (
    <>
      <Navbar />
      <div className="w-full max-w-sm mx-auto mt-20  p-6 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </form>
        <div>
          <h1 className="py-2">
            Don't have an account?{' '}
            <span className="cursor-pointer text-sky-700 font-semibold"onClick={() => {
              // Redirect to the sign-in page when the link is clicked
              navigate('/user/register');
            }}>Sign up now</span>
          </h1>
        </div>
      </div>
      <div className="hidden md:block w-1/3 absolute bottom-0 right-0">
        <img src={logo} alt="" />
      </div>
    </>
  );
};

export default UserSigninForm;

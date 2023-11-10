import React, { useEffect, useState } from 'react';
import Navbar from './../NavBar/Navbar';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AxiosInstance from './../../Components/CustomAxios/axiosInstance'
import { login } from '../Redux/authSlice';
import { selectUserData } from '../Redux/authSlice';



const UserSigninForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_driver, is_super } = userData;
  const axiosInstance = AxiosInstance();   
  console.log("Sign in page")
  console.log(userData)
 

  

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
      const response = await axiosInstance.post('/token/', formData);

      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful:', response.data);

        

        if (response.data.driver==false && response.data.admin==false ) {

        dispatch(
          login({
            userId: response.data.id,
            name: response.data.first_name,
            email: response.data.email,
            username: response.data.username,
            is_super: response.data.admin,
            is_driver: response.data.driver,
            is_active: response.data.active,
            first_name: response.data.first_name,
            accessToken: response.data.access_token, 
            refreshToken: response.data.refresh,
          })
        );  
        navigate('/')}
          else {
            Swal.fire({
              icon: 'error',
              title: 'Authentication Failed',
              text: 'Drivers are not allowed to log in here.', // Customize the error message
            });
          }
    
      } else {
        // Handle other response status codes if needed
        console.error('Authentication failed:', response.status);
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: 'Invalid username or password', // Customize the error message
        });
      }
    } catch (error) {
      // Handle authentication errors here
      console.error('Authentication failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Invalid username or password', // Customize the error message
      });
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
          <h1 className="py-2">
            <span className="cursor-pointer text-sky-700 font-semibold"onClick={() => {
              // Redirect to the sign-in page when the link is clicked
              navigate('/user/forgotpassword');
            }}>Forgot Password</span>
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

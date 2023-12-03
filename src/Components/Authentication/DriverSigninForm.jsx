import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/Navbar';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AxiosInstance from '../CustomAxios/axiosInstance'
import { login } from '../Redux/authSlice';
import { selectUserData } from '../Redux/authSlice';



const DriverSigninForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [demoUserData, setDemoUserData] = useState({
    username: 'sudheesh.uind',
    password: '89200238',
  });

  const [demoDriverData, setDemoDriverData] = useState({
    username: 'sudheeshDriver',
    password: '1234',
  });

  

  const [demoAdminData, setDemoAdminData] = useState({
    username: 'sudheesh',
    password: '89200238',
  });
  
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_driver } = userData;
  const axiosInstance = AxiosInstance(accessToken);   
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
        console.log('Authentication successful:', response.data.is_driver);
        
        if (response.data.driver==true && response.data.admin==false) {
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
          }));
        navigate('/driver/home')}
        else{

          Swal.fire({
            icon: 'error',
            title: 'Authentication Failed',
            text: 'Users are not allowed to log in here.', // Customize the error message
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


  const demoUser = async (e) =>{
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/token/',demoUserData );
      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful:', response.data);
       
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
        navigate('/')
          
    
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
  }


  const demoDriver = async (e) =>{
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/token/',demoDriverData );
      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful:', response.data);
       
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
        navigate('/')
          
    
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
  }

  const demoAdmin = async (e) =>{
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/token/',demoAdminData );
      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful:', response.data);
       
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
        navigate('/')
          
    
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
  }
      

  return (
    <>
      <Navbar />
      <div className="w-full max-w-sm mx-auto mt-20  p-6 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Driver Sign In</h2>
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
              navigate('/driver/register');
            }}>Sign up now</span>
          </h1>
          <h1 className="py-2">
            <span className="cursor-pointer text-sky-700 font-semibold"onClick={() => {
              // Redirect to the sign-in page when the link is clicked
              navigate('/driver/forgotpassword');
            }}>Forgot Password</span>
          </h1>
        </div>

        <div className=' mt-4 border   rounded-lg shadow-2xl bg-zinc-300'>
          <h1 className='text-sky-900 font-extrabold text-center mt-2'> DEMO LOGIN</h1>
          <div className='flex justify-between'>
          <div onClick={demoUser} className='pl-2 pb-2 pt-4'>
          <a href="#_" class="relative inline-flex items-center justify-center p-4 px-4 py-0.5 overflow-hidden font-medium text-indigo-950 transition duration-300 ease-out border-2 border-sky-900 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-950 group-hover:translate-x-0 ease">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">USER</span>
          <span class="relative invisible">USER</span>
          </a>
          </div>

          <div onClick={demoDriver} className='pl-2 pb-2 pt-4'>
          <a href="#_" class="relative inline-flex items-center justify-center p-4 px-3 py-0.5 overflow-hidden font-medium text-indigo-900 transition duration-300 ease-out border-2 border-sky-900 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-950 group-hover:translate-x-0 ease">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">DRIVER</span>
          <span class="relative invisible">DRIVER</span>
          </a>
          </div>

          <div onClick={demoAdmin} className='pl-2 pb-2 pt-4'>
          <a href="#_" class="relative inline-flex items-center justify-center p-4 px-3 py-0.5 overflow-hidden font-medium text-indigo-900 transition duration-300 ease-out border-2 border-sky-900 rounded-full shadow-md group">
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-950 group-hover:translate-x-0 ease">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">ADMIN</span>
          <span class="relative invisible">ADMIN</span>
          </a>
          </div>
          <div>

          </div>

         </div>
        </div>

      </div>
      <div className="hidden md:block w-1/3 absolute bottom-0 right-0">
        <img src={logo} alt="" />
      </div>
    </>
  );
};

export default DriverSigninForm;

import React , { useState } from 'react'
import Navbar from '../Navbar';
import logo from './../../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import logo1 from './../../../assets/Static/drivers-club-logo-color-on-transparent-background1.png';
import Footer from '../Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserSignupform = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  // Show the "Please wait" alert
    showPleaseWaitAlert();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please check your input.',
      });
      return; // Stop execution if passwords don't match
    }

    const { phone } = formData;

    // Check if the phone number is a valid 10-digit number
    if (!/^\d{10}$/.test(phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid 10-digit phone number.',
      });
      return; // Prevent form submission
    }
    // You can add your signup logic here, e.g., send the data to a server.
    console.log('Form submitted with data:', formData);
  
    // Define the API endpoint URL
    const apiUrl = 'http://127.0.0.1:8000/api/register';
  
    // Make an Axios POST request to the API
    axios.post(apiUrl, formData, {headers:{'Content-Type' : 'application/json'}, withCredentials : true })
      .then((response) => {
        
        // Handle the successful response here
        console.log('Otp sent successfully:', response.data);
        const email = formData.email;
        closePleaseWaitAlert();
        showSuccessAlert(email);
        
        // Navigate to the OTP verification page
        navigate('/user/otpverification');
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Registration failed:', error);
        closePleaseWaitAlert();
        let errorMessage = 'Registration failed. Please try again later.'; // Default error message

  // Check if the error response contains a custom error message
        if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Use the custom error message from the response
        }

        showErrorAlert(errorMessage);
      });
  };


  const showPleaseWaitAlert = () => {
    setIsLoading(true);

    Swal.fire({
      icon: 'info',
      title: 'Please Wait',
      text: ' we are verifiying your details',
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  };

  // Function to close the "Please wait" alert
  const closePleaseWaitAlert = () => {
    setIsLoading(false);
    Swal.close();
  };

  // Function to show a success alert
  const showSuccessAlert = (email) => {
    Swal.fire({
      icon: 'success',
      title: 'Enter your OTP',
      text: `OTP sent to your ${email} successfully.`,
    });
  };

  // Function to show an error alert
  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
  };


  return (
    <> 
    <Navbar/>
    <div className="w-full max-w-sm mx-auto mt-20  p-6 border rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          
          <input
            type="text"
            id="first_name"
            placeholder='First Name'
            name="first_name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          
          <input
            type="text"
            placeholder='username'
            id="username"
            name="username"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
         
          <input
            type="email"
            placeholder='E mail'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          
          <input
            type="number"
            placeholder='Mobile number'
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          
          <input
            type="password"
            placeholder='Password'
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          
          <input
            type="password"
            placeholder='Confirm Password'
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
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
            Sign Up
          </button>
        </div>
      </form>
      <div>
        <h1 className='py-2'>Already have an account?? <span className='cursor-pointer text-sky-700 font-semibold' onClick={() => {
              // Redirect to the sign-in page when the link is clicked
              navigate('/user/signin');
            }}>Sign in now</span></h1>
      </div>
    </div>
    <div  className='hidden md:block w-1/3 absolute bottom-0 right-0'>
  
  <img src={logo} alt="" />
   </div>
   
    </>
  );
};

export default UserSignupform
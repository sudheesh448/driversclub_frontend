
import React , { useRef, useState } from 'react'
import Navbar from './../NavBar/Navbar';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import logo1 from './../../assets/Static/drivers-club-logo-color-on-transparent-background1.png';
import Footer from './../Footer/Footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { BASE_IMAGE_URL } from '../Common/BaseUrl';

const DriverSignupform = () => {
  const [ActiveOtpModalIsOpen, setActiveOtpModalIsOpen] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const otpFields = Array(6).fill(0);
  const otpInputRefs = otpFields.map(() => useRef(null));
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
    const apiUrl = `${BASE_IMAGE_URL}/api/driver_register/`;
  
    // Make an Axios POST request to the API
    axios.post(apiUrl, formData, {headers:{'Content-Type' : 'application/json'}, withCredentials : true })
      .then((response) => {
        
        
        console.log('Otp sent successfully:', response.data);
        const email = formData.email;
        closePleaseWaitAlert();
        showSuccessAlert(email);
        
        
      })
      .catch((error) => {
        if (error.response.status === 469) {
          
          console.log(error.response.data)
  
          setActiveOtpModalIsOpen(true);
          
          console.log("modal")
          
        }
       
        console.error('Registration failed:', error);
        closePleaseWaitAlert();
        let errorMessage = 'Registration failed. Please try again later.'; 

        if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; 
        }

        
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

  const closePleaseWaitAlert = () => {
    setIsLoading(false);
    Swal.close();
  };

  const showSuccessAlert = (email) => {
    Swal.fire({
      icon: 'success',
      title: 'Enter your OTP',
      text: `OTP sent to your ${email} successfully.`,
    });
  };

  const openModal = () => {
    setActiveOtpModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setActiveOtpModalIsOpen(false);
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === '') {
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);
  
   
      if (value === '' && index > 0) {
        otpInputRefs[index  ].current.focus();
      } else if (index < 5 && value !== '') {
        
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
   
    const combinedOTP = otp.join('');
    console.log('OTP is:', combinedOTP);
    console.log("username",formData.username)


    const apiUrl = `${BASE_IMAGE_URL}/api/otp_verify_driver/`; 

    axios.post(apiUrl, { otp: combinedOTP,useremail:formData.email}, {headers:{'Content-Type' : 'application/json'}, withCredentials : true })
      .then((response) => {
        
        console.log('OTP verification successful:', response.data);
      
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your account has been created and verified successfully. Please login to continue',
        }).then(() => {
  
          navigate('/user/signin');
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid OTP',
          text: 'Please enter correct OTP',
        })
        console.error('OTP verification failed:', error);
      });
  };



  


  return (
    <> 
    <Navbar/>
    <div className="w-full max-w-sm mx-auto mt-20  p-6 border rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Driver Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          
          <input
            type="text"
            id="first_name"
            placeholder='First Name'
            name="first_name"
            value={formData.first_name}
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
            value={formData.last_name}
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
            type="text"
            placeholder='Liscence number'
            id="license_id"
            name="license_id"
            value={formData.license_id}
            onChange={handleChange}
            maxLength="20"
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

   <Modal
        isOpen={ActiveOtpModalIsOpen} // Control the visibility of the modal
        onRequestClose={closeModal} // Function to close the modal
        contentLabel="OTP Verification Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  shadow-lg rounded w-auto"
        
      >
        <div className="w-full   mx-auto  p-6 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
        <p>Enter the OTP sent to your email or phone.</p>
        <p>{}</p>
        <div className="mb-4 flex justify-center">
          {otpFields.map((_, index) => (
            <input
              key={index}
              type="text"
              placeholder="0"
              value={otp[index]}
              onChange={(e) => handleOTPChange(e, index)}
              className="w-12 px-4 py-2 border rounded-lg text-center focus:outline-none focus:border-blue-400 mr-2"
              ref={otpInputRefs[index]}
              maxLength="1"
            />
          ))}
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        </div>
      </div>
      
      </Modal>
   
    </>
  );
};

export default DriverSignupform
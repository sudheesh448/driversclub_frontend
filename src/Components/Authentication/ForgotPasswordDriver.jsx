
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

const ForgotPasswordDriver = () => {
  const [ActiveOtpModalIsOpen, setActiveOtpModalIsOpen] = useState(false);
  const [PasswordResetModalIsOpen, setPasswordResetModalIsOpen]=useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const otpFields = Array(6).fill(0);
  const otpInputRefs = otpFields.map(() => useRef(null));
  const [formData, setFormData] = useState({
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    console.log("email",formData.email)
    const apiUrl = `${BASE_IMAGE_URL}/api/Forgot_password/`;
    const email = formData.email
    // Make an Axios POST request to the API
    axios.post(apiUrl, email, {headers:{'Content-Type' : 'application/json'}, withCredentials : true })
      .then((response) => {
        
        // Handle the successful response here
        console.log('Otp sent successfully:', response.data);
  
        closePleaseWaitAlert();
        showSuccessAlert(email);
        setActiveOtpModalIsOpen(true);
        // Navigate to the OTP verification page
        // navigate('/user/otpverification');
      })
      .catch((error) => {
        if (error.response.status === 469) {
          // Open the OTP verification modal
          console.log(error.response.data)
          
        }
        // Handle any errors here
        console.error('Registration failed:', error);
        closePleaseWaitAlert();
        let errorMessage = 'Registration failed. Please try again later.'; // Default error message

  // Check if the error response contains a custom error message
        if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Use the custom error message from the response
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

  const openResetModal = () => {
    setPasswordResetModalIsOpen(true);
  };

  // Function to close the modal
  const closeResetModal = () => {
    setPasswordResetModalIsOpen(false);
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) || value === '') {
      // Update the OTP digit at the specified index.
      const updatedOTP = [...otp];
      updatedOTP[index] = value;
      setOTP(updatedOTP);
  
      // Move focus to the previous input field (if available) after deletion.
      if (value === '' && index > 0) {
        otpInputRefs[index  ].current.focus();
      } else if (index < 5 && value !== '') {
        // Move focus to the next input field (if available) after entering a digit.
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    // Combine the OTP digits and perform verification here.
    const combinedOTP = otp.join('');
    console.log('OTP is:', combinedOTP);
    console.log("username",formData.username)


    const apiUrl = `${BASE_IMAGE_URL}/api/otp_verify_forgotpassword/`; // Replace with your backend API URL for OTP verification

    axios.post(apiUrl, { otp: combinedOTP,useremail:formData.email}, {headers:{'Content-Type' : 'application/json'}, withCredentials : true })
      .then((response) => {
        
        console.log('OTP verification successful:', response.data);
          
          closeModal() 
          openResetModal();
          navigate('/driver/signin')
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


  const handleResetPassword = () => {
    // Perform validation and handle resetting password logic here
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The entered passwords do not match.',
      });
      return;
    }

    // Call your API endpoint for resetting the password
    const apiUrl = `${BASE_IMAGE_URL}/api/reset_password/`; // Update with your actual API endpoint
    const resetData = {
      useremail: formData.email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    axios.post(apiUrl, resetData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
      .then((response) => {
        // Handle successful password reset response
        console.log('Password reset successful:', response.data);
        // Optionally, you can redirect the user to a login page or display a success message
        
        closeResetModal();
      })
      .catch((error) => {
        // Handle password reset error
        console.error('Password reset failed:', error);
      });

    // Close the password reset modal
    
  };

  return (
    <> 
    <Navbar/>
    <div className="w-full max-w-sm mx-auto mt-20  p-6 border rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        
        
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

    
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Send OTP
          </button>
        </div>
      </form>
      
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


      <Modal
  isOpen={PasswordResetModalIsOpen}
  onRequestClose={closeResetModal}
  contentLabel="Password Reset Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded w-auto"
>
  <div className="w-full mx-auto p-6 border rounded-lg shadow-xl">
    <h2 className="text-2xl text-center font-semibold mb-4">Reset Password</h2>
    <p></p>
    <div className="mb-4">
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg text-center focus:outline-none focus:border-blue-400"
        required
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg text-center focus:outline-none focus:border-blue-400"
        required
      />
    </div>
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
    </div>
  </div>
</Modal>
   
    </>
  );
};

export default ForgotPasswordDriver;
import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../Components/CustomAxios/axiosInstance'; // Import your Axios instance
import { useSelector } from 'react-redux'; // Import the useSelector hook if you're using Redux
import { selectUserData } from './../../../Redux/authSlice'; // Replace with the actual path to your user slice/selectors
import Modal from 'react-modal';
import { BASE_IMAGE_URL } from '../../../Common/BaseUrl';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';

function Profile_Left_sidedetails() {

  const axiosInstance = AxiosInstance(); // Initialize your Axios instance
  const userData = useSelector(selectUserData); // Replace with the selector that accesses user data in Redux
  const { userId } = userData;
  const [userDetails, setUserDetails] = useState({
    profile_img: '',
    name: '',
    email: '',
    phone: '',
    username: '',
  });
  
  
  useEffect(() => {
    // Fetch user details from your backend API using Axios instance
    axiosInstance
      .get(`/users/${userId}/`) // Replace with the actual API endpoint for fetching user details
      .then((response) => {
        const userResponseData = response.data;
        console.log(userResponseData)
      setUserDetails({

        profile_img: userResponseData.profile_img,
        first_name: userResponseData.first_name,
        email: userResponseData.email,
        phone: userResponseData.phone,
        username: userResponseData.username,
      });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  console.log("img:::",userDetails.profile_img)
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmissionSuccess(false); // Reset success state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userDetails);
      const formData = new FormData();
      formData.append('first_name', userDetails.first_name);
      formData.append('email', userDetails.email);
      formData.append('phone', userDetails.phone);
      formData.append('username', userDetails.username);
      // Check if the profile_img is a File or Blob
      if (userDetails.profile_img instanceof File || userDetails.profile_img instanceof Blob) {
        formData.append('profile_img', userDetails.profile_img);
      }
      const response = await axiosInstance.put(`/update-profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setIsSubmissionSuccess(true);
      } else {
        console.error('Update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setUserDetails({
      ...userDetails,
      [name]: newValue,
    });
  };



  return (
    <>
        <div className='md:w-1/5 pt-12 md:pt-0  md:h-screen items-center justify-center md:flex w-full  md:flex-col  bg-gradient-to-r from-stone-700 to-stone-400'>
        {/* Profile Image */}
        <div className='w-full mx-2 items-center justify-center flex rounded-full overflow-hidden'>
          


<img
              src={userDetails.profile_img
                ? (userDetails.profile_img instanceof File || userDetails.profile_img instanceof Blob)
                  ? URL.createObjectURL(userDetails.profile_img)
                  : `${BASE_IMAGE_URL}${userDetails.profile_img}` 
                : ''}
              className="w-32 h-32 rounded-full mx-auto mb-4"
          />

        </div>

        {/* Profile Information */}
        <div className=' md:mr-0 text-gray-200 p-4 text-center'>
          <h2 className='text-2xl font-bold'>{userDetails.first_name}</h2>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Username: {userDetails.username}</p>

          <div className='flex justify-center items-center mt-4 mr-2 ml-2 mb-2' onClick={openModal }>
        
            <a href="#_" class="relative inline-flex items-center justify-start px-2 py-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Edit</span>
            </a>
            </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
        className="fixed w-auto  mb-4 inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-95"
      >
        <div className=" shadow-2xl bg-white w-full max-w-lg mx-auto rounded-lg mt-20 p-6 ">
          {isSubmissionSuccess ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Success!</h2>
              <p>Your profile has been updated successfully.</p>
              <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Close
              </button>
            </>
          ) : (
            
            <div className='shadow-2xl bg-white '>
            <div className=' flex w-full bg-slate-600 text-gray-50'>
                <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
                <p className='font-medium '>Edit Profile</p>
            </div>

            
              <form className='p-4' onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label htmlFor="name" className="block text-gray-600 font-semibold">Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={userDetails.first_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="email" className="block text-gray-600 font-semibold">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="phone" className="block text-gray-600 font-semibold">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="username" className="block text-gray-600 font-semibold">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-1 flex">
                  <div>

                  
                  <label htmlFor="profileImage" className="block text-gray-600 font-semibold">Profile Image</label>
                  <input
                    type="file"
                    id="profile_img"
                    name="profile_img"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  </div>
                  <div>

                  
                  <img
              src={userDetails.profile_img
                ? (userDetails.profile_img instanceof File || userDetails.profile_img instanceof Blob)
                  ? URL.createObjectURL(userDetails.profile_img)
                  : `${BASE_IMAGE_URL}${userDetails.profile_img}` 
                : ''}
              className="w-20 h-20 ml-6 mt-2 rounded-full mx-auto mb-4"
          />
          </div>
                  
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </Modal>


    </>
  )
}

export default Profile_Left_sidedetails
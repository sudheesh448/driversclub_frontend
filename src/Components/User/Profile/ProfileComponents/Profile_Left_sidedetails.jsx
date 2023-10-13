import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../Components/CustomAxios/axiosInstance'; // Import your Axios instance
import { useSelector } from 'react-redux'; // Import the useSelector hook if you're using Redux
import { selectUserData } from './../../../Redux/authSlice'; // Replace with the actual path to your user slice/selectors
import Modal from 'react-modal';
import { BASE_IMAGE_URL } from '../../../Common/BaseUrl';

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
        <div className='w-1/5 pt-12 flex flex-col bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 '>
        {/* Profile Image */}
        <div className='w-56 mx-2 rounded-full overflow-hidden'>
          


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
        <div className='text-slate-800 p-4 text-center'>
          <h2 className='text-2xl font-bold'>{userDetails.first_name}</h2>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Username: {userDetails.username}</p>
          <button className='text-blue-500 font-semibold' onClick={openModal}>Edit Profile</button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black opacity-95"
      >
        <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6">
          {isSubmissionSuccess ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Success!</h2>
              <p>Your profile has been updated successfully.</p>
              <button onClick={closeModal} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Close
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-4">
                  <label htmlFor="profileImage" className="block text-gray-600 font-semibold">Profile Image</label>
                  <input
                    type="file"
                    id="profile_img"
                    name="profile_img"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  
                  <img
              src={userDetails.profile_img
                ? (userDetails.profile_img instanceof File || userDetails.profile_img instanceof Blob)
                  ? URL.createObjectURL(userDetails.profile_img)
                  : `${BASE_IMAGE_URL}${userDetails.profile_img}` 
                : ''}
              className="w-32 h-32 rounded-full mx-auto mb-4"
          />
                  
                </div>
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                  Save Changes
                </button>
              </form>
            </>
          )}
        </div>
      </Modal>


    </>
  )
}

export default Profile_Left_sidedetails
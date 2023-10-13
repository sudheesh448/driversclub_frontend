import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import Navbar from '../../NavBar/Navbar';
import IconsMenu from '../HOME/Components/IconsMenu';
import Profile_Left_sidedetails from '../Profile/ProfileComponents/Profile_Left_sidedetails';
import CarDetails from './CarComponents/CarDetails';
import Modal from 'react-modal';
import AxiosInstance from './../../../Components/CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../Redux/authSlice';


function Car() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosInstance = AxiosInstance(); 
  const [isSubmissionSuccess, setIsSubmissionSuccess] = useState(false);
  const userData = useSelector(selectUserData);
  const { userId } = userData;
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year_of_make: '',
    photo: null,
    owner: userId,
    register_number: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmissionSuccess(false); // Reset success state
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };


  useEffect(() => {
    fetchCarsForUser();
  }, [ userId]);

  const fetchCarsForUser = () => {
    axiosInstance
      .get(`/cars/${userId}`)
      .then((response) => {
        setCars(response.data.cars);
        console.log("car hii",response.data)
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData2 = {
      ...formData,
      owner: userData.userId, // Replace with your actual way to get the userId from Redux
    };
    try {
      const response = await axiosInstance.post('new_cars/', formData2, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setIsSubmissionSuccess(true);
        // Reset the form data
        setFormData({
          make: '',
          model: '',
          year_of_make: '',
          photo: null,
          owner: '',
          register_number: '',
        });
      } else {
        // Handle errors if the request fails
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  return (
    <>
      <Navbar/>
      <div className='md:block flex md:w-full h-full mt-12 '>
        <div className='flex'>
          {/* Left Image Section */}
          <Profile_Left_sidedetails/>

          {/* Right Section */}
          <div className='w-full '>
            <div className='grid grid-cols-2'>
              <div className='col-span-1 justify-center items-center flex flex-col '>
                {/* Button for Adding New Car */}
                <button  onClick={openModal} className="bg-green-500 text-white px-4 rounded-2xl py-2  mb-4">Add New Car</button>
                {/* Cards for Car Details */}
                
              </div>
              <div className='col-span-1'>
                {/* Icons Menu */}
                <IconsMenu />
              </div>
            </div>

            <CarDetails/>
          </div>
        </div>
      </div>

      <Footer/>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Add New Car Modal"
  className="fixed inset-0 flex items-center justify-center z-50"
>
  <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg p-6">
    {isSubmissionSuccess ? (
      <>
        <h2 className="text-2xl font-semibold mb-4">Success!</h2>
        <p>Your car has been added successfully.</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Close
        </button>
      </>
    ) : (
      <>
        <h2 className="text-2xl font-semibold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              placeholder="Make"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Model"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="year_of_make"
              value={formData.year_of_make}
              onChange={handleInputChange}
              placeholder="Year of Make"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="photo"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              name="register_number"
              value={formData.register_number}
              onChange={handleInputChange}
              placeholder="Register Number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Submit
          </button>
        </form>
      </>
    )}
  </div>
</Modal>
      
    </>
  );
}

export default Car;

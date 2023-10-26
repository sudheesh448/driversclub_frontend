import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import AxiosInstance from './../../../CustomAxios/axiosInstance'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import Lottie from 'lottie-react';
import CarMove from './../../../../assets/Static/animations/CarMove.json';
import { useSpring, animated } from 'react-spring';


function Booking() {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        car: '',
        journey_start_date: null,
        starting_time: '',
        from_location: '',
        locality: '',
        to_location: '',
        return_date: null,
        is_return: false, // Add the 'noReturn' state variable
        terms: false,
      });
      const userData = useSelector(selectUserData);
      const { userId, accessToken } = userData;
      const axiosInstance = AxiosInstance();
      const [startDate, setStartDate] = useState(null);
      const [returnDate, setReturnDate] = useState(null);

      console.log("userI:",userId)
   

      
      useEffect(() => {
        fetchCarsForUser();
      }, [ userId]);
    
      const fetchCarsForUser = () => {
        axiosInstance
          .get(`/cars/${userId}`)
          .then((response) => {
            setCars(response.data.cars);
          })
          .catch((error) => {
            console.error('Error fetching cars:', error);
          });
      };
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send a POST request to the backend with the form data
          const response = await axiosInstance.post('/request_form', formData);
          // Handle the response from the server, e.g., show a success message
          console.log('Form data submitted successfully:', response.data);
    
          Swal.fire({ 
            icon: 'success',
            title: 'Request submitted successfully',
            text: 'We will update you when your request accepted by a driver.',
          });
          setFormData({
            car: '',
        journey_start_date: null,
        starting_time: '',
        from_location: '',
        locality: '',
        to_location: '',
        return_date: null,
        is_return: false, // Add the 'noReturn' state variable
        terms: false,
          });
        } catch (error) {
          if (error.response && error.response.status === 596) {
            // Car is already booked, show an error message
            Swal.fire({
                icon: 'error',
                title: 'Car Already Booked',
                text: 'The selected car is already booked for the requested date range.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Try again.',
            });
            console.error('Error submitting form data:', error);
        }
        }
      };


      const handleNoReturnChange = (event) => {
        setFormData({
          ...formData,
          is_return: event.target.checked,
          return_date: event.target.checked ? null : formData.return_date,
        });
      };
      const handleInputChange = (event) => {
       const { name, value, type, checked, } = event.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
      const handleStartDateChange = (date) => {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        console.log(formattedDate)
        setFormData({
          ...formData,
          journey_start_date: formattedDate,
        });
        setStartDate(date)
      };


      const handleReturnDateChange = (date) => {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        console.log(formattedDate)
        setFormData({
          ...formData,
          return_date: formattedDate,
        });
        setReturnDate(date)
      };

      const today = new Date();
      const minDate = today;
    
      // Disable return date if no journey start date selected
      const isReturnDateDisabled = !formData.journey_start_date;


      function AnimatedCar() {
        
        const animationProps = useSpring({
          from: { transform: 'translateX(100%)' }, // Start from the right
          to: { transform: 'translateX(0%)' }, // Move to the left
          config: { duration: 1000 }, // Animation duration in milliseconds
        });
        
        return (
          <animated.div className='absolute mt-14 bottom-0 left-0 z-30 w-52' style={animationProps}>
            <Lottie className='z-50' animationData={CarMove} />
          </animated.div>
        );
      }

  return (
    <>
        <h1 className="text-white font-bold text-xl mb-1 mt-10">Book Your Driver Now</h1>
  <form onSubmit={handleSubmit}>
  <div className="w-64 mb-2 mt-4">
      <select
        id="car"
        name="car"
        required
        value={formData.car}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      >
        <option value="" disabled>
          Select your car
        </option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {`${car.make} ${car.model} (${car.year_of_make})`}
          </option>
        ))}
      </select>
    </div>


  <div className="relative w-64 mb-2 ">
    <DatePicker
      selected={startDate}
      required
      id='journey_start_date'
      name='journey_start_date'
      onChange={handleStartDateChange}
      minDate={minDate}
      placeholderText="Select starting date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>

  <div className="w-64">
      <label htmlFor="time" className="block text-white font-normal mb-2">
        Select a time:
      </label>
      <input
      required
        type="time"
        id="starting_time"
        name="starting_time"
        value={formData.starting_time}
        onChange={handleInputChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
      required
        type="text"
        id="from_location"
        name="from_location"
        placeholder='From' 
        value={formData.from_location}
        onChange={handleInputChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
      required
        type="text"
        id="locality"
        name="locality"
        placeholder='Locality'
        value={formData.locality}
        onChange={handleInputChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
      required
        type="text"
        id="to_location"
        name="to_location"
        placeholder='To'
        value={formData.to_location}
        onChange={handleInputChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="relative w-64 mb-2 mt-2 ">
    <DatePicker
    id='return_date'
    name='return_date'
      selected={returnDate}
      onChange={handleReturnDateChange}
      placeholderText="Select Return date"
      disabled={formData.is_return || isReturnDateDisabled}
      minDate={new Date(formData.journey_start_date)}
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>  
  
  <div className="w-64 mt-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_return"
          name="is_return"
          onChange={handleNoReturnChange}
          checked={formData.is_return}
          className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
        />
        <span className="text-white">No return</span>
      </label>
    </div>

<div className="w-64 mt-0">
  <label className="flex items-center space-x-2">
    <input
    required
      type="checkbox"
      id="terms"
      name="terms"  
      checked={formData.terms}
      onChange={handleInputChange}
      className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
    />
    <span className="text-white">Accept Terms and conditions</span>
  </label>
</div>

<div className="flex justify-end mb-2">
<button
    type="submit"
    className=" left-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
  >
    Submit
  </button>
  </div>
</form>
    </>
  )
}

export default Booking
import React, { useEffect, useState } from 'react'
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import logotext from './../../assets/Static/drivers-club-logo-color-on-transparent-background1.png';
import logopic from './../../assets/Static/drivers-club-logo-color-on-transparent-background2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import profilep from './../../assets/Static/Icons/Profile.png';
import confirmedlogo from './../../assets/Static/Icons/Confirmed.png';
import Pendinglogo from './../../assets/Static/Icons/Pending.png';
import historylogo from './../../assets/Static/Icons/History.png';
import favoritelogo from './../../assets/Static/Icons/Favorite.png';
import carlogo from './../../assets/Static/Icons/Car.png';
import 'animate.css/animate.min.css';
import bookmark from './../../assets/Static/Icons/bookmark.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import axiosInstance from './../CustomAxios/axiosInstance'
import Swal from 'sweetalert2';



function User_home() {

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  console.log("userhome:",isAuthenticated)
  const isDriver = localStorage.getItem("is_driver");
  const user_id = localStorage.getItem("id");
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

  const initialDetails = {
    car: [],
    journey_start_date: '',
    starting_time: '',
    from_location: '',
    locality: '',
    to_location: '',
    return_date: '',
    is_return: false,
    
  };
  const [details, setLastBooking] = useState(initialDetails);


  useEffect(() => {
    fetchCarsForUser()
   },[])

   
    useEffect(() => {
      // Define the user ID for which you want to fetch the last booking details
       // Replace with the actual user ID
  
      // Make the API GET request to fetch the last booking details
      axiosInstance.get(`/last-booking/${user_id}`)
        .then((response) => {
          setLastBooking(response.data);
          
        })
        .catch((error) => {
          console.error('Error fetching last booking details:', error);
          
        });
    }, []);

  // Handle form submission
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
      console.error('Error submitting form data:', error);
    }
  };
  
  console.log(cars)
  // const user_id=userData ? userData.id : '';
  console.log("userid:",user_id);
  

      const fetchCarsForUser = () => {
        axiosInstance.get(`/cars/${user_id}`) // Use axios.get
            .then((response) => {
                setCars(response.data.cars); // Access data using response.data
            })
            .catch((error) => {
                console.error('Error fetching cars:', error);
            });
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
      setFormData({
        ...formData,
        journey_start_date: date,
      });
    };
    const handleReturnDateChange = (date) => {
      setFormData({
        ...formData,
        return_date: date,
      });
    };
    console.log('trip req:',formData)


    
    

    

    

  return (
    <>
    <Navbar/>
    <div className='mt-14'>
      
      <div className="hidden md:flex shadow-md rounded-2xl mx-2  bg-white ">
  <div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2 rounded-sm">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">Your destination,</h1>
  <h1 className="text-zinc-600 font-bold text-3xl mb-4 mt-4">Our expertise</h1>
  <h1 className=" text-zinc-600  font-bold text-2xl mb-2 mt-4">Book your personal driver</h1>
  <h1 className="text-red-700 font-extrabold text-3xl mb-4 mt-4">Now !</h1>
  </div>
  <div className=" items-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-sm">
     
     <img className=' px-2 py-7 w-auto' src={logo} alt="Drivers_Club" />
  </div>
  <div className=" text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100 h- mx-2 my-2 rounded-sm py-5">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">A secure juorney begins with</h1>
  <h1 className="text-red-700 font-bold text-3xl mb-4 mt-4">Trusted drivers</h1>
  <h1 className=" text-zinc-600  font-semibold text-1xl mb-2 mt-4 py-5">Calicut Trissur Kochi Trivandrm</h1>
  </div>
</div>


<div className='shadow bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
<div className='flex md:hidden'>
<div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-1 my-2 rounded-xl">
  <h1 className=" text-zinc-600  font-semibold text-sm mb-2 mt-4">Your destination,</h1>
  <h1 className="text-zinc-600 font-semibold text-sm mb-2 mt-2">Our expertise</h1>
  <h1 className=" text-zinc-600  font-medium text-sm mb-2 mt-2">Book your personal driver</h1>
  <p className="text-red-700 font-semibold text-sm mb-4 mt-2">Now !</p>
  </div>
  
  <div className="  justify-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-xl">
     
     <img className=' px-2 py-4 w-auto' src={logotext} alt="Drivers_Club" />
  </div>

  <div className="  text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-1 my-2 rounded-xl py-1">
  <h1 className=" text-zinc-600  font-semibold text-sm mb-2 mt-2">A secure juorney begins with</h1>
  <h1 className="text-red-700 font-semibold text-sm mb-2 mt-2">Trusted drivers</h1>
  <h1 className=" text-zinc-600  font-thin text-sm mb-2 mt-2 py-3">Calicut Trissur Kochi Trivandrm</h1>
  </div>
</div>
</div>

{/* Web view  */}
{/* Lower div system view full */}
<div className=' hidden md:flex  w-full mb-2 '>

{/* Booking */}

  <div className=' shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col  mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
  <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Book Your Driver Now</h1>
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
      selected={formData.journey_start_date}
      required
      id='journey_start_date'
      name='journey_start_date'
      onChange={handleStartDateChange}
      
      placeholderText="Select starting date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>

  <div className="w-64">
      <label htmlFor="time" className="block text-gray-700 font-normal mb-2">
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
      selected={formData.return_date}
      onChange={handleReturnDateChange}
      placeholderText="Select Return date"
      disabled={formData.is_return}
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
        <span className="text-gray-700">No return</span>
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
    <span className="text-gray-700">Accept Terms and conditions</span>
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
  
  </div>
  {/* Booking end */}


{/* second div full*/}
<div className='w-full md:w-2/3 '>

{/* Icons*/}
<div className='md:w-full  bg-white  mr-2 py-2 rounded-sm mt-2 '>
  <div className='flex justify-between '>
    <div className=' shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 '>
      <img src={profilep} alt="" className="w-14 h-14 mx-auto " />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Profile</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={confirmedlogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Confirmed</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={Pendinglogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Pending</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={historylogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">History</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={favoritelogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Favorite</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={carlogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Cars</h1>
    </div>
  </div>
</div>
{/* Icons end*/}

{/* Last booking payment pending history full div*/}
  <div className='flex md:w-full mt-1 '>
  
    <div className='w-1/2'> {/* Last booking  payment*/}
{/* Last booking */}
        <div className=' mr-2  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
        <div className=' flex w-full '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Last Booking Details</p> 
        </div>
        <div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-x-4 border-y-4 border-slate-200 ">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Car:</p>
          <p className="font-semibold">{details.car.make}</p>
          <p className="font-semibold">{details.car.model}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Journey Start Date:</p>
          <p className="font-semibold">{details.journey_start_date}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Starting Time:</p>
          <p className="font-semibold">{details.starting_time}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">From Location:</p>
          <p className="font-semibold">{details.from_location}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Locality:</p>
          <p className="font-semibold">{details.locality}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">To Location:</p>
          <p className="font-semibold">{details.to_location}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Return Date:</p>
          <p className="font-semibold">{details.return_date}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Return:</p>
          <p className="font-semibold">{details.is_return ? 'Yes' : 'No'}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Status:</p>
          <p className="font-semibold">{details.status}</p>
        </div>
      </div>
    </div>
        </div>
        </div> {/* Last booking  ends*/}

          {/*  payment*/}
        <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2'>
        <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
        </div>
        <p>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div> {/*   payment ends*/}
        
    </div> {/* Last booking  payment ends*/}
  
  {/* History */}
    <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 w-1/2'>
    <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>History</p>
        
    </div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
  </div>{/* History end*/}

  </div> {/* Last booking payment pending history full div*/}
</div>{/* second div full ends*/}
</div> {/* Lower div system view full ends */}
        {/* Web view ends */}



{/* Mobile view */} 

{/* Booking */}

<div className='  md:hidden shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col  mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
  <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Book Your Driver Now</h1>
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
      selected={formData.journey_start_date}
      required
      id='journey_start_date'
      name='journey_start_date'
      onChange={handleStartDateChange}
      
      placeholderText="Select starting date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>

  <div className="w-64">
      <label htmlFor="time" className="block text-gray-700 font-normal mb-2">
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
      selected={formData.return_date}
      onChange={handleReturnDateChange}
      placeholderText="Select Return date"
      disabled={formData.is_return}
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
        <span className="text-gray-700">No return</span>
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
    <span className="text-gray-700">Accept Terms and conditions</span>
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
  
  </div>
  {/* Booking end */}

  <div className='w-full md:hidden'> {/* Last booking  payment*/}
{/* Last booking */}
        <div className=' ml-2 mr-2 mt-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
        <div className=' flex w-full '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Last Booking Details</p> 
        </div>
        <div className='bg-white rounded-lg shadow-lg p-4'>
        <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Car:</p>
          <p className="font-semibold">{details.car.make}</p>
          <p className="font-semibold">{details.car.model}</p>


        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Journey Start Date:</p>
          <p className="font-semibold">{details.journey_start_date}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Starting Time:</p>
          <p className="font-semibold">{details.starting_time}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">From Location:</p>
          <p className="font-semibold">{details.from_location}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Locality:</p>
          <p className="font-semibold">{details.locality}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">To Location:</p>
          <p className="font-semibold">{details.to_location}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Return Date:</p>
          <p className="font-semibold">{details.return_date}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Return:</p>
          <p className="font-semibold">{details.is_return ? 'Yes' : 'No'}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="text-gray-600">Status:</p>
          <p className="font-semibold">{details.is_return ? 'Yes' : 'No'}</p>
        </div>
        </div>
        </div>

        </div> {/* Last booking  ends*/}
          {/*  payment*/}
        <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 ml-2 mr-2'>
        <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
        </div>
        <p>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div> {/*   payment ends*/}
        
    </div> {/* Last booking  payment ends*/}

    {/* History */}
    <div className=' md:hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2 ml-2'>
    <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
    </div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
  </div>{/* History end*/}

{/* Mobile view ends */}        
      
    </div>
    <Footer/>
    </>
  )
}

export default User_home 
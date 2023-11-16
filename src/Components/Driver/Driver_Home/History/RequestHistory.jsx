import React, { useEffect, useState } from 'react'
import Navbar from '../../../NavBar/Navbar'
import Footer from '../../../Footer/Footer'
import CalendarSchedule from '../DriverComponents/CalenderSchedule'
import AxiosInstance from './../../../CustomAxios/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import postBox from './../../../../assets/Static/Icons/PostBox.png';
import fromto from './../../../../assets/Static/Icons/FromTo.png';
import Icons from '../DriverComponents/Icons';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';

function RequestHistory() {
    const [confirmedRequests, setConfirmedRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const axiosInstance = AxiosInstance();
    const perPage = 10; // Number of items per page
    const navigate = useNavigate()
    const userData = useSelector(selectUserData);
    const userId = userData.userId;
  
    const fetchConfirmedRequests = (page) => {
      const requestBody = {
        page: page,
        per_page: perPage,
        userId: userId,
      };
      axiosInstance
        .post('request_history/', requestBody)
        .then((response) => {
          if (response.status === 200) {
            console.log("request confirmed data", response.data);
            setConfirmedRequests(response.data.results);
            console.log("confirmed requests", response.data.results);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
  
    useEffect(() => {
      fetchConfirmedRequests(currentPage);
    }, [currentPage]);
    const changePage = (newPage) => {
      setCurrentPage(newPage); // Update the current page
    };
    
    
  
  
    return (
      <> 
      <Navbar/>
      <div className='w-full mt-12 hidden md:flex'>
          <div className='w-1/4 mr-2'>
            <div className='h-28 w-full mb-2 bg-slate-100'>
            <Icons/>
            </div>
  <CalendarSchedule/>
          </div>
          <div className='w-3/4 shadow-2xl p-4'>
  
          <div className=" mt-2 mr-4 flex w-full bg-slate-600">
          <div className='flex'>
          <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
          <p className="text-2xl font-semibold mb-4 text-white">Trip History</p>
          </div>
        </div>
            <div className="shadow-xl">
    {confirmedRequests.length > 0 ? (
      confirmedRequests.map((trip) => (
        <div key={trip.id}  onClick={() => {
          navigate(`/trip_request_detail/${trip.trip_id}`);
        }} className="bg-sky-800 border p-4 font-semibold grid grid-cols-5 gap-2 text-white cursor-pointer transform transition-transform hover:scale-105  hover:text-black hover:bg-orange-200">
          
          <div className='flex'>
            <img  className='w-8' src={postBox} alt="" />
          <p className='ml-2'>{trip.user_first_name}</p>
          </div>
          <div className='grid grid-cols-5'>
              <div>
              <p> {trip.from_location}</p>
              </div>
              <div className='justify-center flex w-52'>
              <img className='w-8' src={fromto} alt="" />
              </div>
          </div>
          <div>
          <p>
             {trip.to_location}</p>
          </div>
          <div>
          <p> Date: {trip.journey_start_date}</p>
          </div>
          <div>
           <p> Return: {trip.is_return ? "No return" : trip.return_date}</p>
          
          </div>
          
          {/* Add other trip details you want to display */}
          
        </div>
      ))
    ) : (
      <p className="col-span-5">No pending trip requests found.</p>
    )}
  </div>
            <div className='pagination mt-2 flex justify-center '>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${currentPage === 1 ? 'opacity-50 ' : ''}`}
            >
              Prev 
            </button>
            <span className="bg-sky-800 text-white font-bold p-2 rounded-full mx-4"> {currentPage}</span>
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={confirmedRequests.length < perPage}
              className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${confirmedRequests.length < perPage ? 'opacity-50 ' : ''}`}
            >
              Next 
            </button>
            </div>
          </div>
        </div>

        <div className=' md:hidden mt-12'>
        <div className='h-28 w-full mb-2 bg-slate-100'>
            <Icons/>
            </div>
            <div className='w-full shadow-2xl '>
  
  <div className=" mt-2  flex w-full bg-slate-600">
  <div className='flex'>
          <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
          <p className="text-2xl font-semibold mb-4 text-white">Trip History</p>
          </div>
</div>
<div className="shadow-xl">
  {confirmedRequests.length > 0 ? (
    confirmedRequests.map((trip) => (
      <div key={trip.id}  onClick={() => {
        navigate(`/trip_request_detail/${trip.trip_id}`);
      }} className="bg-sky-800 border p-4 font-semibold grid  md:grid-cols-5 gap-2 text-white cursor-pointer transform transition-transform hover:scale-105  hover:text-black hover:bg-orange-200">
        
        <div className='flex'>
          <img  className='w-8' src={postBox} alt="" />
        <p className='ml-2'>{trip.user_first_name}</p>
        </div>
        <div className='grid '>
            <div>
            <p> {trip.from_location}</p>
            </div>
            <div className='justify-center flex w-52'>
            <img className='w-8' src={fromto} alt="" />
            </div>
        </div>
        <div>
        <p>
           {trip.to_location}</p>
        </div>
        <div>
        <p> Date: {trip.journey_start_date}</p>
        </div>
        <div>
         <p> Return: {trip.is_return ? "No return" : trip.return_date}</p>
        
        </div>
        
        {/* Add other trip details you want to display */}
        
      </div>
    ))
  ) : (
    <p className="col-span-5">No  trip requests found.</p>
  )}
</div>
    <div className='pagination mt-2 flex justify-center '>
    <button
      onClick={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
      className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${currentPage === 1 ? 'opacity-50 ' : ''}`}
    >
      Prev 
    </button>
    <span className="bg-sky-800 text-white font-bold p-2 rounded-full mx-4"> {currentPage}</span>
    <button
      onClick={() => changePage(currentPage + 1)}
      disabled={confirmedRequests.length < perPage}
      className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${confirmedRequests.length < perPage ? 'opacity-50 ' : ''}`}
    >
      Next 
    </button>
    </div>
  </div>
            

        </div>
        <Footer />
      </>
    )
  }

export default RequestHistory
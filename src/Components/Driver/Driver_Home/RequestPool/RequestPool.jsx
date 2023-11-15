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
import Swal from 'sweetalert2';


function RequestPool() {

  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const axiosInstance = AxiosInstance();
  const [responseStatus, setResponseStatus] = useState(200);
  const perPage = 10; // Number of items per page
  const navigate = useNavigate()

  const fetchPendingRequests = (page) => {
    axiosInstance
      .get('request_pool', {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("request pool data",response.data)
          setPendingRequests(response.data.results);
          console.log("pendingp",response.data.results);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResponseStatus(404);
        if (currentPage > 1 && error.response && error.response.status === 404) {
          setCurrentPage(currentPage - 1);
        }
        Swal.fire({
          icon: 'info',
          title: 'No more request',
          text: 'There are no more pending trip requests.',
        });
      });
  };

  useEffect(() => {
    fetchPendingRequests(currentPage);
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
        <p className="text-2xl font-semibold mb-4 text-white">Pending Trip Requests</p>
        </div>
      </div>
          <div className="shadow-xl">
  {pendingRequests.length > 0 ? (
    pendingRequests.map((trip) => (
      <div key={trip.id}  onClick={() => {
        navigate(`/trip_request_detail/${trip.id}`);
      }} className="bg-sky-800 border p-4 font-semibold grid grid-cols-5 gap-2 text-white cursor-pointer transform transition-transform hover:scale-105  hover:text-black hover:bg-orange-200">
        
        <div className='flex'>
          <img  className='w-8' src={postBox} alt="" />
        <p className='ml-2'>{trip.first_name}</p>
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
            disabled={pendingRequests.length < perPage || responseStatus === 404}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${
              pendingRequests.length < perPage || responseStatus === 404 ? 'opacity-50 ' : ''
            }`}
          >
            Next
          </button>
          </div>
        </div>
      </div>



      <div className='md:hidden  w-full mt-12'>

      <div className='h-28 w-full mb-2 bg-slate-100'>
          <Icons/>
      </div>

      <div className='w-full shadow-2xl '>

        <div className=" mt-4 mr-4 flex w-full bg-slate-600">
        <div className='flex'>
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="text-2xl font-semibold mb-4 text-white">Pending Trip Requests</p>
        </div>
      </div>
          <div className="shadow-xl">
  {pendingRequests.length > 0 ? (
    pendingRequests.map((trip) => (
      <div key={trip.id}  onClick={() => {
        navigate(`/trip_request_detail/${trip.id}`);
      }} className="bg-sky-800 border p-4 font-semibold grid grid-cols-5 gap-2 text-white cursor-pointer transform transition-transform hover:scale-105  hover:text-black hover:bg-orange-200">
        
        <div className=''>
          
        <p className='ml-2'>{trip.first_name}</p>
        </div>
        <div className='grid grid-cols-5'>
            <div>
            <p> {trip.from_location}</p>
            </div>
            <div className='justify-center flex w-52'>
           
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
            disabled={pendingRequests.length < perPage || responseStatus === 404}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${
              pendingRequests.length < perPage || responseStatus === 404 ? 'opacity-50 ' : ''
            }`}
          >
            Next
          </button>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}
export default RequestPool
import React, { useEffect, useState } from 'react'
import Navbar from '../../../NavBar/Navbar'
import Footer from '../../../Footer/Footer'
import CalendarSchedule from '../DriverComponents/CalenderSchedule'
import AxiosInstance from './../../../CustomAxios/axiosInstance'; 
import { useNavigate } from 'react-router-dom';

function RequestPool() {

  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const axiosInstance = AxiosInstance();
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
          console.log(response.data)
          setPendingRequests(response.data.results);
          console.log("pendingp",response.data.results);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchPendingRequests(currentPage);
  }, [currentPage]);
  const changePage = (newPage) => {
    setCurrentPage(newPage); // Update the current page
  };
  
  const tripView = () => {
    navigate(`/trip_request_detail/${trip.id}`);
  }

  return (
    <> 
    <Navbar/>
    <div className='w-full mt-12 flex'>
        <div className='w-1/4 mr-2'>
<CalendarSchedule/>
        </div>
        <div className='w-3/4'>
          <h1 className='text-2xl font-semibold mb-4'>Pending Trip Requests</h1>
          <div className="shadow-xl">
  {pendingRequests.length > 0 ? (
    pendingRequests.map((trip) => (
      <div key={trip.id}  onClick={() => {
        navigate(`/trip_request_detail/${trip.id}`);
      }} className="bg-white border  p-4 grid grid-cols-5 gap-2 hover:bg-green-200 cursor-pointer ">
        
        <div>
        <p>User: {trip.user.first_name}</p>
        </div>
        <div>
        <p>From: {trip.from_location}</p>
        </div>
        <div>
        <p>To: {trip.to_location}</p>
        </div>
        <div>
        <p> Start Date: {trip.journey_start_date}</p>
        </div>
        <div>
        <p> Return Date: {trip.return_date} </p>
        
        </div>
        
        {/* Add other trip details you want to display */}
        
      </div>
    ))
  ) : (
    <p className="col-span-5">No pending trip requests found.</p>
  )}
</div>
          <div className='pagination mt-auto flex justify-center'>
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${currentPage === 1 ? 'opacity-50 ' : ''}`}
          >
            Prev 
          </button>
          <span className="mx-4"> {currentPage}</span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={pendingRequests.length < perPage}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${pendingRequests.length < perPage ? 'opacity-50 ' : ''}`}
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
import React, { useEffect, useState } from 'react'
import Navbar from '../../../Components/NavBar/Navbar'
import Footer from '../../../Components/Footer/Footer'

import AxiosInstance from './../../../Components/CustomAxios/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import bookmark from './../../../assets/Static/Icons/bookmark.png';
import postBox from './../../../assets/Static/Icons/PostBox.png';
import fromto from './../../../assets/Static/Icons/FromTo.png';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Components/Redux/authSlice';
import IconsMenu from '../HOME/Components/IconsMenu';
import Profile_Left_sidedetails from '../Profile/ProfileComponents/Profile_Left_sidedetails';

function Pending() {
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
        .post('user_request_pending/', requestBody)
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
      <div className='w-full mt-12  md:flex md:h-screen'>
          
          <Profile_Left_sidedetails/>
          <div className='w-full shadow-2xl p-4'>
  
          <div className=" mt-2 mr-4 flex w-full bg-slate-600">
          <div className='flex'>
          <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
          <p className="text-2xl font-semibold mb-4 text-white">Pending Trip Requests</p>
          </div>
        </div>
            <div className="shadow-xl">
    {confirmedRequests.length > 0 ? (
      confirmedRequests.map((trip) => (
        <div key={trip.id}  onClick={() => {
          navigate(`/trip_request_detail/${trip.id}`);
        }} className="bg-sky-800 border p-4 font-semibold md:grid grid-cols-5 gap-2 text-white cursor-pointer transform transition-transform hover:scale-105  hover:text-black hover:bg-orange-200">
          
          <div className='hidden md:flex'>
            <img  className='w-8' src={postBox} alt="" />
          <p className='ml-2'>{trip.user_first_name}</p>
          </div>
          <div className='grid grid-cols-5'>
              <div>
              <p> {trip.from_location}</p>
              </div>
              <div className='justify-center hidden md:flex w-52'>
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
        <Footer />
      </>
    )
}


export default Pending
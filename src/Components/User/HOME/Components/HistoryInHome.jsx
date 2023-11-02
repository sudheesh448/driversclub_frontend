import React, { useEffect, useMemo, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
library.add(
    faMagnifyingGlass,
  );
  import AxiosInstance from './../../../CustomAxios/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import sendWebSocketMessage from './../../../Notification/SendWebSocketFunction'
function HistoryInHome() {
  const userData = useSelector(selectUserData);
  const { userId } = useMemo(() => userData, [userData]);
    const axiosInstance = AxiosInstance()
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [historyData, setHistoryData] = useState([]);
    const [driver, setdriver] = useState();
    const navigate= useNavigate()

  const dropdownOptions = ['All', 'Confirmed', 'Completed','Started','Pending','Repooled'];


  const fetchData = (page = 1, search = '', option = 'All') => {
    axiosInstance.get(`user_request_history_home/${userId}/?page=${page}&search=${search}&option=${option}`)
      .then(response => {
        console.log("response history", response.data.tripRequests);
        setHistoryData(response.data.tripRequests);
        setTotalPages(response.data.total_pages);
        setdriver(response.data.driver)
        
      })
      .catch(error => {
        console.error('Error fetching history data:', error);
      });
  };
  console.log("historydata",historyData);

  useEffect(() => {
    fetchData(currentPage, searchQuery, selectedOption);
  }, [currentPage, searchQuery, selectedOption]);

  
  const handleSearchquery = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery)
  }

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption)
  }

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      console.log("page",currentPage)
    }
  };
  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchQuery, selectedOption);
  };

  return (
    <div className='w-full'>
       <div className="flex w-full  bg-slate-600 text-gray-50">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium mt-1">History Request</p>
      </div>
<div className='h-auto'>
   <div className=''>
    {historyData.length > 0 ? (
        historyData.map((historyData) => (
          
            <div key={historyData.id}  onClick={() => {
              navigate(`/trip_request_detail/${historyData.id}`);
            }} className="bg-sky-800 hidden md:grid  rounded-3xl border p-4   grid grid-cols-5 gap-2 text-white cursor-pointer   hover:text-sky-950 font-semibold  hover:bg-orange-200"
            >

                
                <div className="  col-span-8 sm:col-span-2 md:col-span-1">
                  <p className=" font-semibold">{historyData.from_location}</p>
                </div>
                
                <div className="col-span-8 sm:col-span-2 md:col-span-1">
                  <p className=" font-semibold">{historyData.status}</p>
                </div>
                <div className="col-span-8 sm:col-span-2 md:col-span-1">
                  <p className=" font-semibold"> <span>{historyData.car.make} </span> 
                  <span>{historyData.car.model} </span>   
                 </p>
                </div>
                <div className="col-span-8 sm:col-span-2 md:col-span-1">
                  <p className=" font-semibold">{historyData.journey_start_date}</p>
                </div>
                <div className="col-span-8 sm:col-span-2 md:col-span-1">
                  <p className=" font-semibold">{historyData.to_location}</p>
                </div>
                
 



        </div>))
    ) : (
        <div className='p-4 font-bold text-2xl text-white text-center'>No Trips Found 
  
        
        </div>
    )}
   </div>
</div>
<div className="hidden md:flex pagination mt-2 flex justify-center ">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${
              currentPage === 1 ? 'opacity-50 ' : ''
            }`}
          >
            Prev
          </button>
          <span className="bg-sky-800 text-white font-bold p-2 rounded-full mx-4">
            {currentPage}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`bg-blue-500 cursor-pointer text-white p-2 rounded ${
              currentPage >= totalPages ? 'opacity-50 ' : ''
            }`}
          >
            Next
          </button>
        </div>


    </div>
  )
}
export default HistoryInHome
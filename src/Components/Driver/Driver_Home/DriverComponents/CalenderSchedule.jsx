import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import Modal from 'react-modal';


function CalendarSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [greenHighlightedDates, setGreenHighlightedDates] = useState([]);
  const [RedHighlightedDates, setRedHighlightedDates] = useState([]);
  const [BlueHighlightedDates, setBlueHighlightedDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalDate, setSelectedModalDate] = useState(null);
  const userData = useSelector(selectUserData);
  const userId = userData.userId;
  const axiosInstance = AxiosInstance();
  const [tripDetails, setTripDetails] = useState(null);
  

  // useEffect(() => {
  //   const formattedDate = selectedDate.toISOString().split('T')[0];
  //   checkTripExistence(formattedDate);
  // }, [selectedDate]);


  const handleDateChange = (date) => {
    console.log("date",date)
    console.log('Current Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
    const formattedDate = date.toLocaleDateString('en-GB'); // Format as "dd mm yyyy"
    console.log("Formatted date", formattedDate);
    setSelectedDate(formattedDate)

    axiosInstance
      .post('check_trip_existence/', { selected_date: formattedDate,userId })
      .then((response) => {
        const { trip_exists, trip_id } = response.data;
        console.log("check res",response.data)
        {
                axiosInstance
              .get(`tripdetail/${trip_id}`, {
                params: {
                  userId: userId, // Include the user ID as a parameter
                }
              })
              .then((tripResponse) => {

                console.log("Trip Details:", tripResponse.data);
                setTripDetails(tripResponse.data);
                openModal();
              })
              .catch((tripError) => {
                console.error('Error fetching trip details:', tripError);
              });
    }
  })
      .catch((error) => {
        console.error('Error checking trip existence:', error);
      });
  };
    
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  


  useEffect(() => {
    axiosInstance
      .post(`driver/calender_confirmed/`, { user_id: userId }) // Send userId in the request body
      .then((response) => response.data)
      .then((data) => {
        console.log("dates::",data)
        console.log("confirmed::",data.date_strings_by_category.confirmed_dates);
        setGreenHighlightedDates(data.date_strings_by_category.confirmed_dates);
        setRedHighlightedDates(data.date_strings_by_category.repooled_dates);
        setBlueHighlightedDates(data.date_strings_by_category.completed_dates);
      })
      .catch((error) => {
        console.error('Error fetching green-highlighted dates:', error);
      });
  }, [userId]);

  const tileClassName = ({ date }) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  if (greenHighlightedDates.includes(formattedDate)) {
    return 'bg-green-600 text-white ';
  }

  if (RedHighlightedDates.includes(formattedDate)) {
    return 'bg-red-600 text-white';
  }
  if (BlueHighlightedDates.includes(formattedDate)) {
    return 'bg-fuchsia-600 text-white';
  }

  return 'bg-sky-900 shadow-2xl text-white'; // Default style for other dates
};


  return (
    
    <div className="calendar-container  mt-2 p-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 text-white rounded-xl">
      <div className="rounded-xl calendar p-4 pt-4 pb-4 bg-cyan-500 shadow-2xl text-black">
        <h1 className='text-white text-center font-bold'>Your Schedules</h1>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          formatMonthYear={(locale, date) =>
            `${date.toLocaleDateString(locale, { month: 'long' })} ${date.getFullYear()}`
          }
          
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-1/2 mx-auto bg-white opacity-95 mt-16"
      >
        {tripDetails ? (
<div className='p-4 '>
  <div className='shadow-2xl  bg-slate-300'>
          <div className='flex bg-sky-900 '>
          <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
          <p className="text-l font-semibold mb-4 text-white">Tripdetails of the day {selectedDate}</p>
          </div>
        <div className="grid grid-cols-3 gap-4 p-2">
          <div>
            <p className='py-2'><strong>Car Make:</strong> {tripDetails.car.make}</p>
            <p className='py-2'><strong>Car Model:</strong> {tripDetails.car.model}</p>
            <p className='py-2'><strong>Driver:</strong> {tripDetails.confirmed_driver}</p>
            <p className='py-2'><strong>From Location:</strong> {tripDetails.from_location}</p>
            <p className='py-2'><strong>To Location:</strong> {tripDetails.to_location}</p>
          </div>
          <div>
            <p className='py-2'><strong>Journey Start Date:</strong> {tripDetails.journey_start_date}</p>
            <p className='py-2'><strong>Return Date:</strong> {tripDetails.return_date}</p>
            <p className='py-2'><strong>Locality:</strong> {tripDetails.locality}</p>
            <p className='py-2'><strong>Starting Time:</strong> {tripDetails.starting_time}</p>
            <p className='py-2'><strong>Status:</strong> {tripDetails.status}</p>
          </div>
          <div>
            <p className='py-2'><strong>User ID:</strong> {tripDetails.user.user_id}</p>
            <p className='py-2'><strong>Username:</strong> {tripDetails.user.username}</p>
            <p className='py-2'><strong>Trip Id:</strong> {tripDetails.trip_request_id}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
        </div>
      </div>
) : (
  <p>Loading trip details...</p> // You can display a loading message or handle it as needed
)}

<div className='justify-end flex p-2' onClick={closeModal}>
<a href="#_" class="relative inline-flex items-center justify-center px-5 py-1 overflow-hidden font-mono font-medium tracking-tighter text-white bg-red-800 rounded-lg group">
<span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
<span class="relative">Close</span>
</a>
</div>
      
      </Modal>
      
    </div>
  );
}

export default CalendarSchedule;

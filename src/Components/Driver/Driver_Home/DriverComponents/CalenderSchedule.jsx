import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';

function CalendarSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState({});
  const [greenHighlightedDates, setGreenHighlightedDates] = useState([]);

  const userData = useSelector(selectUserData);
  const userId = userData.userId;
   console.log(userId)
  const axiosInstance = AxiosInstance();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleChange = (event) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const updatedSchedules = { ...schedules };
    updatedSchedules[dateKey] = event.target.value;
    setSchedules(updatedSchedules);
  };


  useEffect(() => {
    axiosInstance
      .post(`driver/calender_confirmed/`, { user_id: userId }) // Send userId in the request body
      .then((response) => response.data)
      .then((data) => {
        console.log("dates::",data)
        setGreenHighlightedDates(data.green_highlighted_dates);
      })
      .catch((error) => {
        console.error('Error fetching green-highlighted dates:', error);
      });
  }, [userId]);


const redHighlightedDates = ['2023-09-05', '2023-10-10', '2023-10-15']; // Dates for red background

const tileClassName = ({ date }) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  if (greenHighlightedDates.includes(formattedDate)) {
    return 'bg-green-400 text-white ';
  }

  if (redHighlightedDates.includes(formattedDate)) {
    return 'bg-red-400 text-white';
  }

  return 'bg-black text-white'; // Default style for other dates
};
  
  return (
    

    <div className="calendar-container  mt-2 p-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 text-white rounded-xl">
      <div className="rounded-xl calendar p-4 pt-4 pb-4 bg-black shadow-md text-black">
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
      
    </div>
  );
}

export default CalendarSchedule;

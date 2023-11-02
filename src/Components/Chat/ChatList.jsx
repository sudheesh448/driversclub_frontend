import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from './../../Components/Redux/authSlice';
import AxiosInstance from "../../Components/CustomAxios/axiosInstance";
import { Link, useLocation, useNavigate } from 'react-router-dom';
 

function ChatList() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("user_id");
    const driverId = searchParams.get("driver_id");
  const axiosinstance= AxiosInstance()
  const userData = useSelector(selectUserData);
  const userIdred = userData.userId;
  const isDriver = userData.is_driver
  const [chatUsers, setChatUsers] = useState([]);
    const navigate = useNavigate()
  
  useEffect(() => {
    // Make an API call to fetch chat rooms
    axiosinstance.get(`/chat-rooms/${userIdred}/`)
      .then((response) => {
        // Assuming your API returns a list of chat rooms, update the state with unique chat rooms
        console.log("list resp",response.data)
        setChatUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  }, []);
  const handleClick = (userIdList) => {
    
    if (isDriver){
        navigate(`/chat?user_id=${userIdList}&driver_id=${userIdred}`);
    }
    else{
        navigate(`/chat?user_id=${userIdred}&driver_id=${userIdList}`);
    }
    
  };

  console.log("list",userId,driverId);
  
  return (
    <div>
        <div className="flex md:h-96 antialiased text-gray-800">
        
        <div className="flex flex-row  w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto p-1 md:p-6">
            <div  className="  flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div  className="flex-grow overflow-y-auto " >
          {chatUsers.map((user) => (
             
            <div onClick={() => handleClick(user.id)} className={ isDriver
                ? user.id == userId
                  ? 'cursor-pointer bg-green-500 text-sky-950 mx-4 mt-2 mb-1 p-2 rounded-full'
                  : 'cursor-pointer bg-indigo-500 text-white mx-4 mt-2 mb-1 p-2 rounded-full'
                :user.id == driverId
                ? 'cursor-pointer bg-green-500 text-sky-950 mx-4 mt-2 mb-1 p-2 rounded-full'
                : 'cursor-pointer bg-indigo-500 text-white mx-4 mt-2 mb-1 p-2 rounded-full'}
                 key={user.id}>
                <h1 className='font-semibold px-2 '>{user.first_name}</h1></div>



          ))}
        </div>
        </div></div></div></div></div></div>
    </div>
  )
}

export default ChatList
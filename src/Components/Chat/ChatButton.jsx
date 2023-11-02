import React from 'react'
import { useNavigate } from 'react-router-dom'


function ChatButton({ user_id, driver_id }) {
    const navigate= useNavigate()

    const handleClick = () => {
        navigate(`/chat?user_id=${user_id}&driver_id=${driver_id}`);
      };

    console.log("button:::",user_id,driver_id)
  return (
    
    <><button onClick={handleClick} className="bg-green-700 text-white text-sm font-medium rounded-md px-2 py-1">
    Chat
  </button></>
  )
}

export default ChatButton

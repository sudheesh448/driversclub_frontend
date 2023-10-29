import React from 'react'
import { useNavigate } from 'react-router-dom'


function ChatButton({ user_id, driver_id }) {
    const navigate= useNavigate()

    const handleClick = () => {
        navigate(`/chat?user_id=${user_id}&driver_id=${driver_id}`);
      };

    console.log("button:::",user_id,driver_id)
  return (
    <div>
         <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default ChatButton

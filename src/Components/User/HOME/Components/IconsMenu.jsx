import React from 'react'
import profilep from './../../../../assets/Static/Icons/Profile.png';
import confirmedlogo from './../../../../assets/Static/Icons/Confirmed.png';
import Pendinglogo from './../../../../assets/Static/Icons/Pending.png';
import historylogo from './../../../../assets/Static/Icons/History.png';
import favoritelogo from './../../../../assets/Static/Icons/Chat.png';
import carlogo from './../../../../assets/Static/Icons/Car.png';
import { useLocation, useNavigate } from 'react-router-dom';


function IconsMenu() {

const Navigate = useNavigate()
const location = useLocation();
const isProfilePage = location.pathname === '/user/profile';
const isCarPage = location.pathname === '/user/car';
const isConfirmPage = location.pathname === '/user/confirmed';
const isPendingPage = location.pathname === '/user/pending';
const isHistoryPage = location.pathname === '/user/history'
const isChatPage = location.pathname === '/chat'
console.log(location)

const navigateToProfile = () => {
    if (!isProfilePage) {
      Navigate('/user/profile');
    }
  };

const navigateToCar = () => {
    if(!isCarPage){
      Navigate('/user/car')
    }
  }

  const navigateToConfirmed = () => {
    if(!isConfirmPage){
      Navigate('/user/confirmed')
    }
  }
  
  const navigateToPending = () => {
    if(!isPendingPage){
      Navigate('/user/pending')
    }
  }
  const navigateToHistory = () => {
    if(!isHistoryPage){
      Navigate('/user/history')
    }
  }
  const navigateToChat = () => {
    if(!isChatPage){
      Navigate('/chat')
    }
  }
  

  return (
    <>
    <div className='flex justify-between z-30  '>
      
    <div
          onClick={navigateToProfile}
          className={` shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isProfilePage ? 'bg-gray-300 ' : ''
          }`}
        >
      <img src={profilep} alt="" className="w-12 h-12 mx-auto " />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Profile</h1>
    </div>
    <div onClick={navigateToConfirmed} className='  shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={confirmedlogo} alt="" className="w-12 h-12 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Confirmed</h1>
    </div>
    <div onClick={navigateToPending} className=' shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={Pendinglogo} alt="" className="w-12 h-12 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Pending</h1>
    </div>
    <div onClick={navigateToHistory} className=' shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={historylogo} alt="" className="w-12 h-12 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">History</h1>
    </div>
    <div onClick={navigateToChat} className={` text-zinc-600 shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isChatPage ? 'bg-gray-300 ':''}`}>
      <img src={favoritelogo} alt="" className="w-12 h-12 mx-auto" />
      <h1 className=" font-semibold text-sm mb-1 mt-3">Chats</h1>
    </div>

    <div  onClick={navigateToCar} className={` shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isCarPage ? 'bg-gray-300 ' : ''
          }`}>
      <img src={carlogo} alt="" className="w-12 h-12 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Cars</h1>
    </div>
  </div>
    </>
  )
}

export default IconsMenu
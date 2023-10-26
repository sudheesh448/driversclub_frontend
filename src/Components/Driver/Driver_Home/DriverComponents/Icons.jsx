import React from 'react'
import profilep from './../../../../assets/Static/Icons/Profile.png';
import confirmedlogo from './../../../../assets/Static/Icons/Confirmed.png';
import Pendinglogo from './../../../../assets/Static/Icons/Pending.png';
import historylogo from './../../../../assets/Static/Icons/History.png';
import favoritelogo from './../../../../assets/Static/Icons/Favorite.png';
import carlogo from './../../../../assets/Static/Icons/Car.png';
import { useLocation, useNavigate } from 'react-router-dom';


function Icons() {
const Navigate = useNavigate()
const location = useLocation();
const isProfilePage = location.pathname === '/driver/profile';
const isPRequestpoolPage = location.pathname === '/driver/requestpool';
const isConfirmedRequestPage = location.pathname === '/driver/confirmedrequests';
const isHistoryPage = location.pathname === '/driver/trip_history'

const navigateToProfile = () => {
  if (!isProfilePage) {
    Navigate('/driver/profile');
  }
};
const navigateToRequestpool = () =>{
  if (!isPRequestpoolPage) {
    Navigate('/driver/requestpool');
  }
}

const navigateToConfirmed = () => {
  if (!isConfirmedRequestPage) {
    Navigate('/driver/confirmedrequests');
  }
}

const navigateToHistory = () => {
  if (!isHistoryPage) {
    Navigate('/driver/trip_history');
  }
}

  return (
    <>
    <div className='ml-2 flex justify-between  '>
    <div onClick={navigateToProfile} className={` cursor-pointer w-1/4 px-2 py-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isProfilePage ? 'bg-gray-300 ' : ''
          }` }>
      <img src={profilep} alt="" className="w-14 h-14 mx-auto " />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Profile</h1>
    </div>

    <div onClick={navigateToConfirmed} className={` cursor-pointer  w-1/4 px-2 py-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isConfirmedRequestPage ? 'bg-gray-300 ' : ''
          }` }>
      <img src={confirmedlogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Confirmed</h1>
    </div>

    <div onClick={navigateToRequestpool} className={` cursor-pointer items-center flex-col  w-1/4 px-2 py-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isPRequestpoolPage ? 'bg-gray-300 ' : ''
          }` }>
      <img src={Pendinglogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">Request Pool</h1>
    </div>
    <div onClick={navigateToHistory} className={`cursor-pointer  items-center flex-col  w-1/4 px-2 py-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 ${
            isHistoryPage ? 'bg-gray-300 ' : ''
          }` }>
      <img src={historylogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-sm mb-1 mt-3">History</h1>
    </div>
    
    
  </div>
    
    </>
  )
}

export default Icons
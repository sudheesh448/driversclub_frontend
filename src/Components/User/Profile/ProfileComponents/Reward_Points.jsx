import React from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import wallet from './../../../../assets/Static/Icons/Wallet.png'
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import rewardlogo from './../../../../assets/Static/Icons/Rewards.png';


function Reward_Points() {
  return (
    <>
    <div className="flex w-full bg-slate-600 text-gray-50">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium">Wallet</p>
      </div>
    <div className='bg-white p-4 rounded-lg shadow my-4  flex mx-4'>
      <div>
<img className='w-36'  src={rewardlogo} alt="" />
      </div>
      <div>
      <h3 className='text-lg font-semibold'>Reward Points</h3>
      </div>
                
                {/* Add content for Reward Points card */}
              </div>
    </>
  )
}

export default Reward_Points
import React from 'react'
import AdminDB from './../../../../../assets/Static/Icons/AdminDashboard.png'
import Rpool from './../../../../../assets/Static/Icons/Pending.png'
import DriverProfile from './../../../../../assets/Static/Icons/driverlists.png'
import UserProfile from './../../../../../assets/Static/Icons/Profile.png'
import bankIcons from './../../../../../assets/Static/Icons/Bank.png'
import { Navigate, useNavigate } from 'react-router-dom'

function AdminIcons() {
const navigate=useNavigate()
const NavigateToHome = () =>{
navigate('/admin/home')
  }
  const NavigateToDriver = () =>{
    navigate('/admin/driverlist')
      }
const NavigateToUsers = () =>{
  navigate('/admin/userlist')
    }
const NavigateToBank = () =>{
  navigate('/admin/Banking')
    }
const NavigateToRequests = () =>{
  navigate('/admin/Requests')
    }
  return (
    <div className='p-2'>
        <div onClick={NavigateToHome} className='text-center cursor-pointer justify-center items-center flex-col w-16'>
        <img src={AdminDB} alt="" />
        <p className='text-xs  text-sky-900 font-bold'>DASH BOARD</p>
        </div>
        
        <div onClick={NavigateToRequests} className='text-center w-16  mt-2 '>
        <img src={Rpool} alt="" />
        <p className='text-xs font-bold mt-2 text-sky-900  '>RQUESTS</p>
        </div>
        <div onClick={NavigateToDriver} className=' cursor-pointer text-center mt-2 w-16'>
        <img src={DriverProfile} alt="" />
        <p className='text-xs font-bold text-sky-900'>DRIVERS </p>
        </div>
        <div onClick={NavigateToUsers} className='text-center mt-2 w-16'>
        <img src={UserProfile} alt="" />
        <p className='text-xs font-bold text-sky-900'>USERS </p>
        </div>
        <div onClick={NavigateToBank} className='text-center mt-2 w-16'>
        <img src={bankIcons} alt="" />
        <p className='text-xs font-bold text-sky-900'>BANK</p>
        </div>

        
    </div>
  )
}

export default AdminIcons


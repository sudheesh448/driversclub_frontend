import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'animate.css/animate.min.css';
import Navbar from './../../NavBar/Navbar';
import Footer from './../../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Head from './Components/Head';
import Mobilehead from './Components/Mobilehead';
import Booking from './Components/Booking';
import LastBooking from './Components/LastBooking';
import IconsMenu from './Components/IconsMenu';
import PendingPayments from './Components/PendingPayments';
import HistoryInHome from './Components/HistoryInHome';

function UserHome() {
  const navigate = useNavigate();
  

  

  return (
    <>
      <Navbar />
      <div className='mt-14'>
        <Head />
        <div className='shadow bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
          <Mobilehead />
        </div>

        {/* Web view */}
        <div className='hidden md:flex w-full mb-2 '>
          <div className='shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
            <Booking />
          </div>
          <div className='w-full md:w-2/3 '>
            <div className='md:w-full  bg-white  mr-2 py-2 rounded-sm mt-2 '>
              <IconsMenu />
            </div>
            <div className='flex md:w-full mt-1 '>
              <div className='w-1/2'> 
                <div className='mr-2  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
                <PendingPayments />
                </div> 
                <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2'>
                  <LastBooking />
                </div> 
              </div> 
              <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 w-1/2'>
                <HistoryInHome />
              </div>
            </div> 
          </div>
        </div> 
        
        
        {/* Mobile view */}
        {/* Booking */}
        <div className='md:hidden shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
          <Booking />
        </div>
        <div className='w-full md:hidden'>
          {/* Last booking */}
          <div className='ml-2 mr-2 mt-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
            <LastBooking />
          </div> 
          {/* payment */}
          <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 ml-2 mr-2'>
            <PendingPayments />
          </div> 
        </div> 
        {/* History */}
        <div className='md:hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2 ml-2'>
          <HistoryInHome />
        </div>
        
      </div>
      <Footer />
    </>
  )
}

export default UserHome;

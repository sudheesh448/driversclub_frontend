import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'animate.css/animate.min.css';
import bookmark from './../../../assets/Static/Icons/bookmark.png';
import Navbar from '../../../Components/NavBar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import TripRequestCard from './DriverComponents/TripRequestCard';
import CalenderSchedule from './DriverComponents/CalenderSchedule';
import HeaderWeb from './DriverComponents/HeaderWeb';
import HeaderMobile from './DriverComponents/HeaderMobile';
import Icons from './DriverComponents/Icons';
import UpComing from './DriverComponents/UpComing';
import AwaitingPayments from './DriverComponents/AwaitingPayments';

function Driver_home() {
  return (
    <>
      <Navbar />
      <div className='mt-14'>
        <div className="hidden md:flex shadow-md rounded-2xl mx-2 bg-white">
          <HeaderWeb />
        </div>
        <div className='shadow bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200'>
          <HeaderMobile />
        </div>

        {/* Web view */}
        <div className='hidden md:flex w-full mb-2'>
          <TripRequestCard />
          <div className='w-full md:w-2/3 '>
            {/* Icons */}
            
            
            <div className='flex md:w-full mt-1 '>
              <div className='w-1/2'>
                
                <div className='mr-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
                  <UpComing />
                </div>
               
                <div className='bg-[radial_gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2'>
                <AwaitingPayments/>
                </div>
                
              </div>
              
              <div className='shadow-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 w-1/2 '>
              <div className='md:w-full bg-white mr-2 py-2 rounded-sm mb-2 mx-1'>
              <Icons />
            </div>
                <div className='flex w-full bg-gray-500 text-white'>
                  <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
                  <p className='font-medium '>Your Schedules</p>
                </div>
                <div className='px-6 mb-10'>
                  <CalenderSchedule />
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      
        <div className='md:hidden pb-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mb-2'>
          <div className='flex w-full bg-gray-500 text-white '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Your Schedules</p>
          </div>
          <div className='px-10 '>
            <CalenderSchedule />
          </div>
        </div>
        <div className='md:hidden shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
          <TripRequestCard />
        </div>
        
        <div className='w-full md:hidden'>
          
          <div className='ml-2 mr-2 mt-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
            <AwaitingPayments/>
          </div>
          
          <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 ml-2 mr-2'>
            <UpComing />
          </div>
          
        </div>
        
      </div>
      
      <Footer />
    </>
  )
}

export default Driver_home;

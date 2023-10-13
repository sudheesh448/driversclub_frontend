import React from 'react';
import Footer from '../../Footer/Footer';
import Navbar from '../../NavBar/Navbar';
import Profile_Left_sidedetails from './../../User/Profile/ProfileComponents/Profile_Left_sidedetails';
import Wallet_profile from './../../User/Profile/ProfileComponents/wallet_profile';
import Wallet_PendingPayments from './../../User/Profile/ProfileComponents/Wallet_PendingPayments';
import PendingPayments from './../../User/HOME/Components/PendingPayments'
import Icons from '../Driver_Home/DriverComponents/Icons';
import CalendarSchedule from '../Driver_Home/DriverComponents/CalenderSchedule';
import AwaitingPayments from '../Driver_Home/DriverComponents/AwaitingPayments';

function Driver_Profile() {
  return (
    <>
     <Navbar />
      <div className='md:block flex md:w-full h-full mt-12 '>
        <div className='flex'>
          {/* Left Image Section */}
          <Profile_Left_sidedetails/>

          {/* Right Empty Section */}
          <div className='w-full '>
              <div className="w-full flex"> 
                
                <div className='bg-slate-300 w-1/2'>
                <h1>DRIVER PROFILE</h1>
                </div>
                <div className='w-2/4'>
               <Icons/>
                </div>
              </div>
            
            
            <div className='w-full bg-red-500 flex'>
                <div className=' bg-amber-500 w-1/3'>
                <CalendarSchedule/>
                </div>
                <div>
                    <AwaitingPayments/>
                </div>
              
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Driver_Profile
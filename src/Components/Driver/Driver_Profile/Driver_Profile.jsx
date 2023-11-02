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
import Bio from './Driver_profile_components/Bio';
import UpComing from '../UpComing/UpComing';

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
              <div className="w-full flex "> 
                <div className=' mr-2 w-8/12 bg-sky-900 shadow-2xl'>
                <Bio/>
                </div>
                <div className='w-5/12 m-0.5 shadow-2xl'>
                <div className=' bg-white shadow-xl py-2 '>
               <Icons/>
                </div>
                </div>
              </div>
            <div className='w-full  flex'>
                <div className=' w-1/3'>
                <CalendarSchedule/>
                </div>
                
                <div className='mt-2'>
                  <div>
                  <Wallet_profile/>
                  </div>
                  <div className='mt-12 mb-4 pb-4 rounded-md'>
                    <UpComing/>
                  </div>
                </div>
                <div className='w-64 mt-2  ml-1 shadow-2xl '>
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
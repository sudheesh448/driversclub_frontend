import React from 'react';
import Footer from '../../Footer/Footer';
import Navbar from '../../NavBar/Navbar';
import IconsMenu from '../HOME/Components/IconsMenu';
import Profile_Left_sidedetails from './ProfileComponents/Profile_Left_sidedetails';
import Wallet_profile from './ProfileComponents/Wallet_profile';
import Wallet_PendingPayments from './ProfileComponents/Wallet_PendingPayments';
import Reward_Points from './ProfileComponents/Reward_Points';
import LastBooking from '../HOME/Components/LastBooking';
import PendingPayments from './../../User/HOME/Components/PendingPayments'

function Profile() {
  return (
    <>
      <Navbar />
      <div className='md:block flex md:w-full h-full mt-12 '>
        <div className='flex'>
          {/* Left Image Section */}
          <Profile_Left_sidedetails/>

          {/* Right Empty Section */}
          <div className='w-full  grid grid-cols-2'>
            <div className='col-span-1'>
              <div className="m-2"> 
              <div className='bg-slate-300 mb-2'>
                <Wallet_profile/>
                </div>
                <div className='bg-slate-300'>
                <PendingPayments/>
                </div>
              </div>
            </div>

            <div className='col-span-1'>
              <div className="m-2"> 
                <div className=' border-orange-500 border shadow-lg'>
                  <IconsMenu/>
                </div>
                <div className='mt-2'>
                <Reward_Points/>
                </div>
                <div className='bg-slate-300'>
                <LastBooking/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;

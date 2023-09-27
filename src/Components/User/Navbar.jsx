import React, { useState } from 'react';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars,faHouse ,faRightFromBracket, faUser,faCircleCheck,faClock,faFolderOpen,faStar,faCar,} from '@fortawesome/free-solid-svg-icons';
library.add(faXmark, faBars,faHouse,faRightFromBracket,faUser,faCircleCheck,faClock,faFolderOpen,faStar,faCar);

function Navbar() {
  
        const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <nav className=" fixed top-0 w-full  bg-[#d7dae2] py-1 px-4 h-13 mx-auto my-auto z-50 ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
          <img src={logo} alt="Drivers_club_logo" className="h-11 w-auto" />
          </div>
          <nav>

{/* Mobile view starts */}

<section className="md:hidden">
          <div
            className="space-y-2 cursor-pointer"
            onClick={() => setIsNavOpen((prev) => !prev)} // Toggle isNavOpen state on click
          >
            <div className={`text-2xl ${isNavOpen ? 'hidden' : ''}`}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={`text-2xl ${isNavOpen ? '' : 'hidden'}`}>
              <FontAwesomeIcon icon={faXmark} spin style={{ color: '#171717' }} />
            </div>
          </div>

          {/* Drop-down menu starts */}
          <div className={`absolute ${isNavOpen ? 'block' : 'hidden'} rounded-sm w-2/5 opacity-90 h-auto bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-sky-200 to-gray-100 flex flex-col items-start pt-4 top-16 right-4`}>
            <ul className="flex flex-col items-start">
              <li className='mt-4 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-house" size="xl" className='mr-4' />
              <label className='font-semibold' htmlFor="">HOME</label>
              </li>
              <li className='mt-4 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-user" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>PROFILE</label>
              
              </li>
              <li className='mt-4 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-circle-check" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>CONFIRMED</label>
              </li>
              <li className='mt-4 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-clock" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>PENDING</label>
              </li>
              <li className='mt-4 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-folder-open" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>HISTORY</label>
              </li>
              <li className='mt-2 ml-2 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-star" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>FAVORITE</label>
              </li>
              <li className='mt-4 ml-2 flex items-center '>
              <FontAwesomeIcon icon="fa-solid fa-car" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>CARS</label>
              </li>
              <li className='mt-4 ml-2 mb-5 flex items-center'>
              <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="xl" className='mr-4' />
              <label htmlFor="" className='font-semibold'>LOG OUT</label>
              </li>
            </ul>
          </div>
          {/* Drop-down menu ends */}
        </section>
        {/* Mobile view ends */}
        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
          <li>
            <a href="/about"><FontAwesomeIcon icon="fa-solid fa-house" size="xl" /></a>
          </li>
          <li>
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="xl" />
          </li>
          
        </ul>
      </nav>
  
    
        </div>
      </nav>

      
    </>
  );
   
}

export default Navbar
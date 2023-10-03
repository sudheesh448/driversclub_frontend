import React, { useState } from 'react';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars,faHouse ,faRightFromBracket, faUser,faCircleCheck,faClock,faFolderOpen,faStar,faCar,} from '@fortawesome/free-solid-svg-icons';
library.add(faXmark, faBars,faHouse,faRightFromBracket,faUser,faCircleCheck,faClock,faFolderOpen,faStar,faCar);

import { useDispatch, useSelector } from 'react-redux';
import {logout} from './../Redux/authActions'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const name = userData ? userData.first_name : '';
  const greeting = name ? `Hi ${name}` : 'Hi Guest';

  console.log("name:",name)


  const  handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(logout());
    // Check if the logout was successful
    if (response.success) {
      console.log('Logout successful front end:', response.message);
      navigate('/user/signin');
    } else {
      // Handle logout failure here, if needed
      console.error('Logout failed:', response.message);
      // You can show an error message to the user if needed
    }
    } catch (error) {
      // Handle authentication errors here
      console.error('Authentication failed:', error);
      // You can show an error message to the user if needed
    }
  };


  
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
            <h1>
              <p>{greeting}</p>
            </h1>
          </li>
          <li>
            <a href="/about"><FontAwesomeIcon icon="fa-solid fa-house" size="xl" /></a>
          </li>
          {isAuthenticated && (
          <li className='cursor-pointer' onClick={handleLogout}>
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="xl" />
          </li>
          )}
        </ul>
      </nav>
  
    
        </div>
      </nav>

      
    </>
  );
   
}

export default Navbar
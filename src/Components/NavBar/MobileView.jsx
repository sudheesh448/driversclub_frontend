import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AxiosInstance from './../CustomAxios/axiosInstance';
import { logout } from './../Redux/authSlice';
import { selectUserData } from './../Redux/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CarLeftToRight from '../User/HOME/Components/CarAnimations/CarLeftToRight';
import { Chat, Notifications } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  faXmark,
  faBars,
  faHouse,
  faRightFromBracket,
  faUser,
  faCircleCheck,
  faClock,
  faFolderOpen,
  faStar,
  faCar,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faXmark,
  faBars,
  faHouse,
  faRightFromBracket,
  faUser,
  faCircleCheck,
  faClock,
  faFolderOpen,
  faStar,
  faCar
);



function MobileViewNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_driver,refreshToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);   
  const name = userData ? userData.first_name : '';
  const isDriver = userData.is_driver;
  const is_super = userData.is_super;
  const userId = userData.userId;
  const greeting = is_super ? 'Hi Admin' : name ? `Hi ${name}` : 'Hi Guest';
  const [socket, setSocket] = useState(null);
  const [websocketMessages, setWebsocketMessages] = useState([]);
  const location = useLocation();
  const isProfilePage = location.pathname === '/user/profile';
  const isCarPage = location.pathname === '/user/car';
  const isConfirmPage = location.pathname === '/user/confirmed';
  const isPendingPage = location.pathname === '/user/pending';
  const isHistoryPage = location.pathname === '/user/history'
  const isChatPage = location.pathname === '/chat'
  console.log(location)

  const navigateToProfile = () => {
    if (!isProfilePage) {
      Navigate('/user/profile');
    }
  };

const navigateToCar = () => {
    if(!isCarPage){
      Navigate('/user/car')
    }
  }

  const navigateToConfirmed = () => {
    if(!isConfirmPage){
      Navigate('/user/confirmed')
    }
  }
  
  const navigateToPending = () => {
    if(!isPendingPage){
      Navigate('/user/pending')
    }
  }
  const navigateToHistory = () => {
    if(!isHistoryPage){
      Navigate('/user/history')
    }
  }
  const navigateToChat = () => {
    if(!isChatPage){
      Navigate('/chat')
    }
  }

  const handleLogout = async () => {
    try {
      
      const response = await axiosInstance.post('/logout/', {
           refresh_token: refreshToken,
        });
     
      dispatch(logout());

      Swal.fire({
        icon: 'success',
        title: 'Lougout successfull',
        text: 'Thank you for use our services',
        confirmButtonText: 'OK',
      });

      Navigate('/user/signin');
    } catch (error) {
      console.error('Logout error:', error);

      Swal.fire({
        icon: 'warning',
        title: 'Something went wrong !!',
        text: 'Try again',
        confirmButtonText: 'OK',
      });
      
    }
  };


  return (
    <>
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
        <div
          className={`absolute ${isNavOpen ? 'block' : 'hidden'} rounded-sm w-2/5 opacity-90 h-auto bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-sky-200 to-gray-100 flex flex-col items-start pt-4 top-16 right-4`}
        >
          {userId && (
          <ul className="flex flex-col items-start"> 
            <li className=" mt-4 ml-2 flex items-center cursor-pointer">
            <a href={isDriver ? '/driver/home' : (is_super ? '/admin/home' : '/')}>
              <FontAwesomeIcon icon={faHouse} size="xl" className="mr-4" />
              <label className="font-semibold cursor-pointer" htmlFor="">
                HOME
              </label>
              </a>
            </li>
            <li onClick={navigateToProfile} className="mt-4 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faUser} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold cursor-pointer">
                PROFILE
              </label>
            </li>
            <li onClick={navigateToConfirmed} className="mt-4 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold cursor-pointer">
                CONFIRMED
              </label>
            </li>
            <li onClick={navigateToPending} className="mt-4 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faClock} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold cursor-pointer">
                PENDING
              </label>
            </li>
            <li onClick={navigateToHistory} className="mt-4 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faFolderOpen}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold cursor-pointer">
                HISTORY
              </label>
            </li>
            <li onClick={navigateToChat} className="mt-2 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faStar} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold cursor-pointer">
                CHATS
              </label>
            </li>
            <li onClick={navigateToCar} className="mt-4 ml-2 flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faCar} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold cursor-pointer">
                CARS
              </label>
            </li>



            <li onClick={handleLogout} className="mt-4 ml-2 mb-5 flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold cursor-pointer">
                LOG OUT
              </label>
            </li>
            </ul>)}

            {userId && (
            <ul>
            <li className="mt-2 ml-2 flex items-center cursor-pointer">
              <a href="/user/signin">
            <FontAwesomeIcon icon=" cursor-pointer fa-solid fa-arrow-right-to-bracket" size="xl" />
              <label className=" cursor-pointer font-semibold mx-3" htmlFor="">
                 User Sign in
              </label>
              </a>
            </li>
            <li className="mt-4 ml-2 flex items-center cursor-pointer">
            <a href="/driver/signin">
            <FontAwesomeIcon icon="fa-solid cursor-pointer fa-arrow-right-to-bracket" size="xl" />
              <label className=" cursor-pointer font-semibold mx-3" htmlFor="">
              Driver Sign in
              </label>
              </a>
            </li>
            <li className="mt-4 ml-2 flex items-center mb-4">
            <a href="/admin/signin">
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" size="xl" />
              <label className="font-semibold mx-3 " htmlFor="">
                Admin Sign in
              </label>
              </a>
            </li>
          </ul>
            )}
        </div>
        {/* Drop-down menu ends */}
      </section>
    </>
  );
}

export default MobileViewNavbar;

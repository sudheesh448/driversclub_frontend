import React, { useEffect, useState } from 'react';
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faBars,
  faHouse,
  faRightFromBracket,
  faArrowRightToBracket,
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
  faArrowRightToBracket,
  faUser,
  faCircleCheck,
  faClock,
  faFolderOpen,
  faStar,
  faCar
);

import MobileViewNavbar from './MobileView';
import AxiosInstance from './../CustomAxios/axiosInstance';
import { logout } from './../Redux/authSlice';
import { selectUserData } from './../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CarLeftToRight from '../User/HOME/Components/CarAnimations/CarLeftToRight';
import { Chat, Notifications } from '@mui/icons-material';



function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { accessToken,isAuthenticated,is_driver,refreshToken } = userData;
  const axiosInstance = AxiosInstance(accessToken);   
  const [isNavOpen, setIsNavOpen] = useState(false);
  const name = userData ? userData.first_name : '';
  const isDriver = userData.is_driver
  const userId = userData.userId;
  const greeting = name ? `Hi ${name}` : 'Hi Guest';
  const [socket, setSocket] = useState(null);
  const [websocketMessages, setWebsocketMessages] = useState([]);

  
  useEffect(() => {
    const roomName = `${userId}`;
    console.log("room name----", roomName);
    const newSocket = new WebSocket(`wss://letstravel.shop/ws/notification/${roomName}/`);
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection opened notification");
      };
      socket.onmessage = (event) => {
        console.log("messaage recived notification");
        console.log("recieved",event.data)
        const data = JSON.parse(event.data);
        const message_get = data.message_content;
        setWebsocketMessages((prevMessages) => [...prevMessages, data]);
      };
    }

    
  }, [socket]);

  
    useEffect(() => {
      if (websocketMessages && websocketMessages.length > 0) {
        try {
          const lastMessage = websocketMessages[websocketMessages.length - 1];
          const messageContent = lastMessage.message_content;
  
          Swal.fire({
            title: messageContent,
            icon: 'info',
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText: 'Close',
          });
        } catch (error) {
          // Handle the error, e.g., log it or display a message to the user
          console.error('Error parsing WebSocket message:', error);
        }
      }
    }, [websocketMessages]);


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

      navigate('/user/signin');
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
      <nav className="fixed top-0 w-full bg-[#d7dae2] py-1 px-4 h-13 mx-auto my-auto z-50">
      <CarLeftToRight/>
        <div className="mx-auto flex justify-between items-center">
        
          <div className="text-white text-2xl font-semibold">
          
            <img src={logo} alt="Drivers_club_logo" className="h-11 w-auto" />
          </div>
          <nav>
            <MobileViewNavbar />
            <ul className="DESKTOP-MENU z-50 hidden space-x-8 lg:flex">
              <li>
                <h1>
                  <p>{greeting}</p>
                </h1>
              </li>
              {isAuthenticated && (
                <a href="/chat">
                <li className="cursor-pointer z-50" >
                  <Chat/>
                </li>
                </a>
              )}
              
              <li className='z-50 cursor-pointer'>
              <a href={isDriver ? '/driver/home' : (isSuper ? '/admin/home' : '/')}>
                  <FontAwesomeIcon icon="fa-solid fa-house" size="xl" />
                </a>
              </li>
              {isAuthenticated && (
                <li className="cursor-pointer z-50" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-right-from-bracket"
                    size="xl"
                  />
                </li>
              )}
          {isAuthenticated ? null : (
          <li className="  cursor-pointer"
          onClick={() => setIsNavOpen((prev) => !prev)}>
    
          <div className={`   ${isNavOpen ? 'hidden' : ''}`}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </div>
          <div className={` ${isNavOpen ? '' : 'hidden'}`}>
            <FontAwesomeIcon size="xl" icon={faXmark} spin style={{ color: '#171717' }} />
          </div>
              </li>
              )} 
            </ul>
            <div
          className={`absolute ${isNavOpen ? 'block' : 'hidden'} rounded-sm w-64 opacity-90 h-auto bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-sky-200 to-gray-100 flex flex-col items-start pt-4 top-16 right-4`}
        >
          <ul className="flex flex-col items-start">
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
        </div>
        {/* Drop-down menu ends */}
      

          </nav>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AxiosInstance from './../CustomAxios/axiosInstance';
import { logout } from './../Redux/authSlice';
import { selectUserData } from './../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CarLeftToRight from '../User/HOME/Components/CarAnimations/CarLeftToRight';
import { Chat, Notifications } from '@mui/icons-material';
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

const navigate = useNavigate();
const dispatch = useDispatch();
const userData = useSelector(selectUserData);
const isDriver = userData.is_driver;
const is_super = userData.is_super;
const userId = userData.userId;

function MobileViewNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
          <ul className="flex flex-col items-start">
            <li className="mt-4 ml-2 flex items-center">
            <a href={isDriver ? '/driver/home' : (is_super ? '/admin/home' : '/')}>
              <FontAwesomeIcon icon={faHouse} size="xl" className="mr-4" />
              <label className="font-semibold" htmlFor="">
                HOME
              </label>
              </a>
            </li>
            <li className="mt-4 ml-2 flex items-center">
              <FontAwesomeIcon icon={faUser} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold">
                PROFILE
              </label>
            </li>
            <li className="mt-4 ml-2 flex items-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold">
                CONFIRMED
              </label>
            </li>
            <li className="mt-4 ml-2 flex items-center">
              <FontAwesomeIcon icon={faClock} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold">
                PENDING
              </label>
            </li>
            <li className="mt-4 ml-2 flex items-center">
              <FontAwesomeIcon
                icon={faFolderOpen}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold">
                HISTORY
              </label>
            </li>
            <li className="mt-2 ml-2 flex items-center">
              <FontAwesomeIcon icon={faStar} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold">
                FAVORITE
              </label>
            </li>
            <li className="mt-4 ml-2 flex items-center">
              <FontAwesomeIcon icon={faCar} size="xl" className="mr-4" />
              <label htmlFor="" className="font-semibold">
                CARS
              </label>
            </li>
            <li className="mt-4 ml-2 mb-5 flex items-center">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="xl"
                className="mr-4"
              />
              <label htmlFor="" className="font-semibold">
                LOG OUT
              </label>
            </li>
          </ul>
        </div>
        {/* Drop-down menu ends */}
      </section>
    </>
  );
}

export default MobileViewNavbar;

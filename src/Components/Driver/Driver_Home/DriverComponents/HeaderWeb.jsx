import React from 'react'
import logo from './../../../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
function HeaderWeb() {
  return (
    <>
        <div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2 rounded-sm">
            <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">Your Journey Begins Here,</h1>
            <h1 className="text-zinc-600 font-bold text-3xl mb-4 mt-4">Drivers HUB</h1>
            <h1 className=" text-zinc-600  font-bold text-2xl mb-2 mt-4">Drive their way earn their</h1>
            <h1 className="text-red-700 font-extrabold text-3xl mb-4 mt-4">Trust</h1>
        </div>
        <div className=" items-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-sm">
            <img className=' px-2 py-7 w-auto' src={logo} alt="Drivers_Club" />
        </div>
        <div className=" text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100 h- mx-2 my-2 rounded-sm py-5">
            <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">Empowering Drivers, </h1>
            <h1 className="text-red-700 font-bold text-3xl mb-4 mt-4">One Trip at a Time</h1>
            <h1 className=" text-zinc-600  font-semibold text-1xl mb-2 mt-4 py-5">Calicut Trissur Kochi Trivandrm</h1>
        </div>

    </>
  )
}

export default HeaderWeb
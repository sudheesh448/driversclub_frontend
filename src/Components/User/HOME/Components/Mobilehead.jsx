import React from 'react'
import logotext from './../../../../assets/Static/drivers-club-logo-color-on-transparent-background1.png';


function Mobilehead() {
  return (
    <div>
<div className='flex md:hidden'>
<div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-1 my-2 rounded-xl">
  <h1 className=" text-zinc-600  font-semibold text-sm mb-2 mt-4">Your destination,</h1>
  <h1 className="text-zinc-600 font-semibold text-sm mb-2 mt-2">Our expertise</h1>
  <h1 className=" text-zinc-600  font-medium text-sm mb-2 mt-2">Book your personal driver</h1>
  <p className="text-red-700 font-semibold text-sm mb-4 mt-2">Now !</p>
  </div>
  
  <div className="  justify-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-xl">
     
     <img className=' px-2 py-4 w-auto' src={logotext} alt="Drivers_Club" />
  </div>

  <div className="  text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-1 my-2 rounded-xl py-1">
  <h1 className=" text-zinc-600  font-semibold text-sm mb-2 mt-2">A secure juorney begins with</h1>
  <h1 className="text-red-700 font-semibold text-sm mb-2 mt-2">Trusted drivers</h1>
  <h1 className=" text-zinc-600  font-thin text-sm mb-2 mt-2 py-3">Calicut Trissur Kochi Trivandrm</h1>
  </div>
    </div>
    </div>
  )
}

export default Mobilehead
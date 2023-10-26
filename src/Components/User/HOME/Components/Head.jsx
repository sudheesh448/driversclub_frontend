import React from 'react'
import logo from './../../../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import Lottie from 'lottie-react';
import CarMove from './../../../../assets/Static/animations/CarMove.json';
import { useSpring, animated } from 'react-spring';

function Head() {


  function AnimatedCar() {
    const animationProps = useSpring({
      from: { transform: 'translateX(100%)' }, // Start from the right
      to: { transform: 'translateX(0%)' }, // Move to the left
      config: { duration: 1000 }, // Animation duration in milliseconds
    });
    return (
      <animated.div className='absolute z-30 w-52' style={animationProps}>
        <Lottie className='z-50' animationData={CarMove} />
      </animated.div>
    );
  }


  return (
    <div>
        <div className="hidden md:flex shadow-md rounded-sm mx-2  bg-sky-950 ">
        
  <div className="  text-center  shadow-2xl w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2 rounded-sm">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">Your destination,</h1>
  <h1 className="text-zinc-600 font-bold text-3xl mb-4 mt-4">Our expertise</h1>
  <h1 className=" text-zinc-600  font-bold text-2xl mb-2 mt-4">Book your personal driver</h1>
  <h1 className="text-red-700 font-extrabold text-3xl mb-4 mt-4">Now !</h1>
  </div>
  <div className=" shadow-2xl items-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-sm">
     
     <img className=' px-2 py-7 w-auto' src={logo} alt="Drivers_Club" />
  </div>
  <div className="shadow-2xl text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100 h- mx-2 my-2 rounded-sm py-5">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">A secure juorney begins with</h1>
  <h1 className="text-red-700 font-bold text-3xl mb-4 mt-4">Trusted drivers</h1>
  <h1 className=" text-zinc-600  font-semibold text-1xl mb-2 mt-4 py-5">Calicut Trissur Kochi Trivandrm</h1>
  </div>
</div>
    </div>
  )
}

export default Head
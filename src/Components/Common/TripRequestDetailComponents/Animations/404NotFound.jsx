import React from 'react'
import notfound from '../../../../assets/Static/animations/404NotFound.json'
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';

function NotFound() {
  return (
    <Lottie
        animationData={notfound} // Replace with your animation data
        loop={true} // Set to true to make the animation loop continuously
        autoplay={true} 
        className="w-1/3 ml-18 mt-24 "
      />
  )
}

export default NotFound
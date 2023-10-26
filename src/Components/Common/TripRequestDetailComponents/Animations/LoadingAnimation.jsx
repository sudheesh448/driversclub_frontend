import React from 'react'
import accessDenied from '../../../../assets/Static/animations/Accessdenied.json'
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';

function Accessdenied() {
  return (
    <Lottie
        animationData={accessDenied} // Replace with your animation data
        loop={true} // Set to true to make the animation loop continuously
        autoplay={true} 
        className="w-72 ml-18 mt-24 "
      />
  )
}

export default Accessdenied
import React from 'react'
import Lottie from 'lottie-react';
import Timer from '../../../../assets/Static/animations/timer.json';
import { useSpring, animated } from 'react-spring';

function TimerSand() {
  return (
    
<Lottie
        animationData={Timer} // Replace with your animation data
        loop={true} // Set to true to make the animation loop continuously
        autoplay={true} 
        className="w-80 "
      />
        
    
  )
}

export default TimerSand
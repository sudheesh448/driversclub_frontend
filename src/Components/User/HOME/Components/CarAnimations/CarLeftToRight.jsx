import React from 'react'
import CarLeftTo from './../../../../../assets/Static/animations/CarPlaneLeftToRight (2).json'
import Lottie from 'lottie-react';
import { useSpring, animated } from 'react-spring';

function CarLeftToRight() {
    const animationProps = useSpring({
        from: { transform: 'translateX(-500%)' }, // Start from the right
        to: { transform: 'translateX(1200%)' }, // Move to the left
        config: { duration: 10000 }, // Animation duration in milliseconds
      });
      return (
        <animated.div className='absolute  z-50 w-52' style={animationProps}>
          <Lottie className='z-50' animationData={CarLeftTo} />
        </animated.div>
      );
}

export default CarLeftToRight
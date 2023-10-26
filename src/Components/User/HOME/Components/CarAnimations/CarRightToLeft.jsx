import React from 'react'
import Lottie from 'lottie-react';
import CarMove from './../../../../../assets/Static/animations/CarMove.json';
import { useSpring, animated } from 'react-spring';

function CarRightToLeft() {
    const animationProps = useSpring({
        from: { transform: 'translateX(350%)' }, // Start from the right
        to: { transform: 'translateX(-1500%)' }, // Move to the left
        config: { duration: 10000 }, // Animation duration in milliseconds
      });
      return (
        <animated.div className='absolute bottom-64 hidden md:block z-50 w-52' style={animationProps}>
          <Lottie className='z-40'  animationData={CarMove} />
        </animated.div>
      );
}

export default CarRightToLeft
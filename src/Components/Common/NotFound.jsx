import React from 'react'
import Lottie from 'lottie-react';

function NotFound() {
  return (
    <div>
        <Lottie
        animationData={notfound} // Replace with your animation data
        loop={true} // Set to true to make the animation loop continuously
        autoplay={true} 
        className="w-1/3 ml-18 mt-24 "
      />
    </div>
  )
}

export default NotFound
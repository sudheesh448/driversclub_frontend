import React from 'react'
import Lottie from 'lottie-react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import notfound from '../../assets/Static/animations/404NotFound.json'

function NotFound() {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col items-center justify-center min-h-screen'>
        <Lottie
        animationData={notfound} // Replace with your animation data
        loop={true} // Set to true to make the animation loop continuously
        autoplay={true} 
        className="w-1/3 ml-18 mt-24 "
        />
        </div>
        <Footer/>
    </div>
  )
}

export default NotFound
import React, { useEffect, useState } from 'react'
import logo from './../../assets/Static/drivers-club-logo-color-on-transparent-background.png';
import logotext from './../../assets/Static/drivers-club-logo-color-on-transparent-background1.png';
import logopic from './../../assets/Static/drivers-club-logo-color-on-transparent-background2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import profilep from './../../assets/Static/Icons/Profile.png';
import confirmedlogo from './../../assets/Static/Icons/Confirmed.png';
import Pendinglogo from './../../assets/Static/Icons/Pending.png';
import historylogo from './../../assets/Static/Icons/History.png';
import favoritelogo from './../../assets/Static/Icons/Favorite.png';
import carlogo from './../../assets/Static/Icons/Car.png';
import 'animate.css/animate.min.css';
import bookmark from './../../assets/Static/Icons/bookmark.png';
import Navbar from './../User/Navbar';
import Footer from './../User/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Driver_home() {

  
  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);};
  
    
      const [selectedTime, setSelectedTime] = useState('');
    
      const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
      };

      const isAuthenticated = localStorage.getItem("isAuthenticated");
      useEffect(() => { 
        if (isAuthenticated=='false') {
          navigate('/user/signin/');
        }
      }, [isAuthenticated, navigate]);
      
  return (
    <>
    <Navbar/>
    <div className='mt-14'>
      
      <div className="hidden md:flex shadow-md rounded-2xl mx-2  bg-white ">
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
</div>


<div className='shadow bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
<div className='flex md:hidden'>
<div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-1 my-2 rounded-xl">
  <h1 className=" text-zinc-600  font-semibold text-sm mb-2 mt-4">Your Journey Begins Here,</h1>
  <h1 className="text-zinc-600 font-semibold text-sm mb-2 mt-2">Drivers HUB</h1>
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

{/* Web view  */}
{/* Lower div system view full */}
<div className=' hidden md:flex  w-full mb-2 '>

{/* Booking */}

  <div className=' shadow-2xl md:w-1/3 flex mr-2 items-center  flex-col  mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
  <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Request pool</h1>
  <div className='w-full bg-white rounded-lg opacity-80'>
    <div className='w-full px-1 flex flex-row justify-between'> 
    <h3 className='text-sm text-zinc-600 font-mono' >Posted by <span className='text-red-700 font-semibold'>Name</span></h3>
    <h3 className='text-sm text-zinc-600 font-mono' >Posted on <span className='text-red-700 font-semibold' >Date time</span></h3>
    </div>
    <div className='w-full px-1  flex flex-row justify-between'> 
    <h3 className='text-sm text-zinc-600 font-mono' >From : <span className='text-red-700 font-semibold' >Cityyyyy</span></h3>
    <h3 className='text-sm text-zinc-600 font-mono' >To : <span className='text-red-700 font-semibold' >Cityyyy</span></h3>
    <h3 className='text-sm text-zinc-600 font-mono' >Date : <span className='text-red-700 font-semibold' >Date time</span></h3>
    </div>
    <div className='w-full px-1  flex flex-row justify-between'> 
    <h3 className='text-sm text-zinc-600 font-mono' >Return : <span className='text-red-700 font-semibold' >Date</span></h3>
    <h3 className='text-sm text-zinc-600 font-mono' >To : <span className='text-red-700 font-semibold' >Cityyyy</span></h3>
    
    </div>
    
    <div className='flex justify-around mx-1 my-1'>
    <div>
    <h3 className='text-sm text-zinc-600 font-mono' >Car : <span className='text-red-700 font-semibold' >Car name model</span></h3>
    </div>
      <button className='bg-blue-300 font-medium text-zinc-600 rounded-md text-sm px-1'>View</button>
    </div>
  </div>
  
  
  </div>
  {/* Booking end */}


{/* second div full*/}
<div className='w-full md:w-2/3 '>

{/* Icons*/}
<div className='md:w-full  bg-white  mr-2 py-2 rounded-sm mt-2 '>
  <div className='flex justify-between '>
    <div className=' shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300 '>
      <img src={profilep} alt="" className="w-14 h-14 mx-auto " />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Profile</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={confirmedlogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Confirmed</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={Pendinglogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Pending</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={historylogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">History</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={favoritelogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Favorite</h1>
    </div>
    <div className='shadow-inner w-1/6 px-2 text-center hover:bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800 transition-colors duration-300'>
      <img src={carlogo} alt="" className="w-14 h-14 mx-auto" />
      <h1 className="text-zinc-600 font-semibold text-lg mb-1 mt-3">Cars</h1>
    </div>
  </div>
</div>
{/* Icons end*/}

{/* Last booking payment pending history full div*/}
  <div className='flex md:w-full mt-1 '>
  
    <div className='w-1/2'> {/* Last booking  payment*/}
{/* Last booking */}
        <div className=' mr-2  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
        <div className=' flex w-full '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Last Booking Details</p> 
        </div>
        <div>
        <p className='text-center'>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div>
        </div> {/* Last booking  ends*/}
          {/*  payment*/}
        <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2'>
        <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
        </div>
        <p>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div> {/*   payment ends*/}
        
    </div> {/* Last booking  payment ends*/}
  
  {/* History */}
    <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 w-1/2'>
    <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
    </div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
  </div>{/* History end*/}

  </div> {/* Last booking payment pending history full div*/}
</div>{/* second div full ends*/}
</div> {/* Lower div system view full ends */}
        {/* Web view ends */}



{/* Mobile view */} 

{/* Booking */}

<div className='  md:hidden shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col  mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
  <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Book Your Driver Now</h1>
  
  </div>
  {/* Booking end */}

  <div className='w-full md:hidden'> {/* Last booking  payment*/}
{/* Last booking */}
        <div className=' ml-2 mr-2 mt-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
        <div className=' flex w-full '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Last Booking Details</p> 
        </div>
        <div>
        <p className='text-center'>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div>
        </div> {/* Last booking  ends*/}
          {/*  payment*/}
        <div className=' bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 ml-2 mr-2'>
        <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
        </div>
        <p>Lorem Ipsum is simply dummy  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
        </div> {/*   payment ends*/}
        
    </div> {/* Last booking  payment ends*/}

    {/* History */}
    <div className=' md:hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 mt-2 mr-2 ml-2'>
    <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>Payments pending</p>
        
    </div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
  </div>{/* History end*/}

{/* Mobile view ends */}        
      
    </div>
    <Footer/>
    </>
  )
}

export default Driver_home 
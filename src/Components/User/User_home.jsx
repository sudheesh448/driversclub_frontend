import React, { useState } from 'react'
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



function User_home() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);};
  
    
      const [selectedTime, setSelectedTime] = useState('');
    
      const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
      };

  return (
    <div className='mt-14'>
      
      <div className="hidden md:flex shadow-md rounded-2xl mx-2  bg-white ">
  <div className="  text-center  w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2 rounded-sm">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">Your destination,</h1>
  <h1 className="text-zinc-600 font-bold text-3xl mb-4 mt-4">Our expertise</h1>
  <h1 className=" text-zinc-600  font-bold text-2xl mb-2 mt-4">Book your personal driver</h1>
  <h1 className="text-red-700 font-extrabold text-3xl mb-4 mt-4">Now !</h1>
  </div>
  <div className=" items-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100  mx-2 my-2  rounded-sm">
     
     <img className=' px-2 py-7 w-auto' src={logo} alt="Drivers_Club" />
  </div>
  <div className=" text-center w-1/3 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-300 via-blue-300 to-gray-100 h- mx-2 my-2 rounded-sm py-5">
  <h1 className=" text-zinc-600  font-bold text-3xl mb-2 mt-4">A secure juorney begins with</h1>
  <h1 className="text-red-700 font-bold text-3xl mb-4 mt-4">Trusted drivers</h1>
  <h1 className=" text-zinc-600  font-semibold text-1xl mb-2 mt-4 py-5">Calicut Trissur Kochi Trivandrm</h1>
  </div>
</div>


<div className='shadow bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-neutral-100 to-gray-200 '>
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

{/* Web view  */}
{/* Lower div system view full */}
<div className=' hidden md:flex  w-full mb-2 '>

{/* Booking */}

  <div className=' shadow-2xl md:w-1/3 flex mr-2 items-center justify-center flex-col  mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
  <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Book Your Driver Now</h1>
  <form>
  <div className="w-64 mb-2  mt-4 ">
      <select
        id="options"
        name="options"
        placeholder='fffd'
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      >
        <option className=' text-gray-200' value="" disabled>
          Select your car
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>   
    </div>


  <div className="relative w-64 mb-2 ">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select starting date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>

  <div className="w-64">
      <label htmlFor="time" className="block text-gray-700 font-normal mb-2">
        Select a time:
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='From' 
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='Locality'
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='To'
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="relative w-64 mb-2 mt-2 ">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select Return date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>  
  
  <div className="w-64 mt-2">
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="time"
      name="time"
      onChange={handleTimeChange}
      className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
    />
    <span className="text-gray-700">No return</span>
  </label>
</div>
<div className="w-64 mt-0">
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="time"
      name="time"
      onChange={handleTimeChange}
      className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
    />
    <span className="text-gray-700">Accept Terms and conditions</span>
  </label>
</div>

<div className="flex justify-end mb-2">
<button
    type="submit"
    className=" left-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
  >
    Submit
  </button>
  </div>
</form>
  
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
  <form>
  <div className="w-64 mb-2  mt-4 ">
      <select
        id="options"
        name="options"
        placeholder='fffd'
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      >
        <option className=' text-gray-200' value="" disabled>
          Select your car
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>   
    </div>


  <div className="relative w-64 mb-2 ">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select starting date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>

  <div className="w-64">
      <label htmlFor="time" className="block text-gray-700 font-normal mb-2">
        Select a time:
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='From' 
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='Locality'
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="w-64 mt-2">
      
      <input
        type="text"
        id="time"
        name="time"
        placeholder='To'
        onChange={handleTimeChange}
        className=" rounded-lg w-full border text-sm  border-gray-300  py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
    <div className="relative w-64 mb-2 mt-2 ">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      placeholderText="Select Return date"
      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-900 text-sm rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline block w-64 p-2.5"
    />
  </div>  
  
  <div className="w-64 mt-2">
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="time"
      name="time"
      onChange={handleTimeChange}
      className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
    />
    <span className="text-gray-700">No return</span>
  </label>
</div>
<div className="w-64 mt-0">
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="time"
      name="time"
      onChange={handleTimeChange}
      className="rounded border text-sm border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
    />
    <span className="text-gray-700">Accept Terms and conditions</span>
  </label>
</div>

<div className="flex justify-end mb-2">
<button
    type="submit"
    className=" left-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
  >
    Submit
  </button>
  </div>
</form>
  
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
  )
}

export default User_home
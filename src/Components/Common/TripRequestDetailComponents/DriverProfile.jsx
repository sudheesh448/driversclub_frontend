import React from 'react'
import { BASE_IMAGE_URL } from '../BaseUrl';
import TimerSand from './Animations/Timer';


function DriverProfile({TripRequest}) {
  return (
    TripRequest.confirmed_driver === null ? (
        <div className="text-white flex flex-col items-center justify-center  ">
<h2 className="text-2xl font-semibold text-center pt-4 mb-2 text-white ">
      Wait..!!
    </h2>
    <h2 className="text-center text-lg font-semibold  text-white ">
        Your request is still pending
    </h2>
            <div>
            <TimerSand/>
            </div>
            
           
        </div>
      ) : (
    <div className=''><div className="profile-section text-center py-6 ">
    <h2 className="text-xl font-semibold mb-2 text-white ">
      Accepted By
    </h2>
    <div className="rounded-full bg-blue-500 w-40 h-40  m-auto flex items-center justify-center overflow-hidden">
      <img
              src={TripRequest.driver_profile_pic
                ? (TripRequest.driver_profile_pic instanceof File || TripRequest.driver_profile_pic instanceof Blob)
                  ? URL.createObjectURL(TripRequest.driver_profile_pic)
                  : `${BASE_IMAGE_URL}${TripRequest.driver_profile_pic}` 
                : ''}
              className="w-40 h-40 rounded-full mx-auto border-white border-4 "
          />
    </div>
    <h2 className="text-xl font-semibold text-white mt-3">
      {TripRequest.driver_firstname}
    </h2>
    <h2 className="text-xl font-semibold text-white ">
      {TripRequest.confirmed_driver}
    </h2>
    
    <p className="text-sm  text-white">
      {TripRequest.driver_mobile_number}
    </p>
    <p className="text-sm  text-white">
      {TripRequest.driver_email}
    </p>
    <h2 className="text-xl mb-10 font-semibold text-white mt-3">
    Total Journeys With Us  {TripRequest.driver_count}
    </h2>
  </div>
  </div>
  )

)}
export default DriverProfile
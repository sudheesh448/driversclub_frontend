import React from 'react'
import { BASE_IMAGE_URL } from '../BaseUrl';

function UserProfile({TripRequest}) {
  return (
    <div className=''><div className="profile-section text-center py-6 ">
    <h2 className="text-xl font-semibold mb-2 text-white ">
      Posted By
    </h2>
    <div className="rounded-full bg-blue-500 w-40 h-40  m-auto flex items-center justify-center overflow-hidden">
      <img
              src={TripRequest.user.Profile_pic
                ? (TripRequest.user.Profile_pic instanceof File || TripRequest.user.Profile_pic instanceof Blob)
                  ? URL.createObjectURL(TripRequest.user.Profile_pic)
                  : `${BASE_IMAGE_URL}${TripRequest.user.Profile_pic}` 
                : ''}
              className="w-40 h-40 rounded-full mx-auto border-white border-4 "
          />
    </div>
    <h2 className="text-xl font-semibold text-white mt-3">
      {TripRequest.user.first_name}
    </h2>
    <h2 className="text-xl font-semibold text-white ">
      {TripRequest.user.username}
    </h2>
    
    <p className="text-sm  text-white">
      {TripRequest.user.mobile}
    </p>
    <p className="text-sm  text-white">
      {TripRequest.user.email}
    </p>
    <h2 className="text-xl mb-10 font-semibold text-white mt-3">
    Total Journeys With Us  {TripRequest.userCount}
    </h2>
  </div>
  </div>
  )
}

export default UserProfile
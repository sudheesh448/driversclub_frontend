import React, { useEffect, useState } from 'react';
import AxiosInstance from './../../CustomAxios/axiosInstance'; 
import Swal from 'sweetalert2';
import { selectUserData } from './../../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function Repool(trip_request_id) {
    console.log("trip id",trip_request_id);
    const axiosInstance = AxiosInstance();
    const userData = useSelector(selectUserData);
    const isDriver = userData.is_driver;
    const userId = userData.userId;
    const trip_id = trip_request_id.trip_request_id
    console.log(trip_id)

    const handleRepoolRequest = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You cannot accept any request during the repooled period.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, repool it!',
          cancelButtonText: 'No, cancel!',
        }).then((result) => {
          if (result.isConfirmed) {
            axiosInstance
              .post('driver/repoolrequest/', {
                is_driver: isDriver, 
                user_id: userId,
                trip_id: trip_id, 
              })
              .then((response) => {
                Swal.fire({
                  title: 'Success',
                  text: 'Request Repooled Successfully.',
                  icon: 'success',
                })
                console.log('Repool request successful:', response.data);
              })
              .catch((error) => {
                // Handle errors if the request fails
                console.error('Error repooling request:', error);
              });
          }
        });
      };

  return (
    <div>
        <button
              onClick={handleRepoolRequest}
                className="ml-2 bg-red-600 text-white text-sm font-medium rounded-md px-2 py-1"
              >
                Repool Request
              </button>
    </div>
  )
}

export default Repool
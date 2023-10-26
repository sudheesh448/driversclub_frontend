
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from './../../Redux/authSlice';
import React, { useEffect, useState } from 'react';
import AxiosInstance from './../../CustomAxios/axiosInstance'; 
import Swal from 'sweetalert2';


function AcceptRequest( {trip_request_id}) {
    const axiosInstance = AxiosInstance();
    console.log("hiiii",trip_request_id)

    const userData = useSelector(selectUserData);
    const isDriver = userData.is_driver;
    const userId = userData.userId;
    const handleAcceptRequest = () => {
        axiosInstance
          .post('driver/acceptrequest/', {
            is_driver: isDriver, 
            user_id: userId,
            trip_id: trip_request_id, 
          })
          .then((response) => {
            if (response.status === 200) {
              
              console.log('Request accepted successfully', response.data);
              Swal.fire({
                icon: 'success',
                title: 'Request Accepted ',
                text: 'You accepted this request.',
              });
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 599) {
              Swal.fire({
                icon: 'info',
                title: 'Request Already Confirmed',
                text: 'This request is already confirmed.',
              });
              console.log('This request is already confirmed');
            } else if (error.response && error.response.status === 598) {
              console.log('You cannot accept this request');
              Swal.fire({
                icon: 'error',
                title: 'Cannot Accept Request',
                text: 'You cannot accept this request.',
              });
            } else if (error.response && error.response.status === 597) {
              console.log('You cannot accept this request');
              Swal.fire({
                icon: 'error',
                title: 'Cannot Accept Request',
                text: 'You already have booking on that day. Check your schedule',
              });
            }
            else {
              console.error('Error accepting request:', error);
            }
          });
      };

  return (
    <><button onClick={handleAcceptRequest} className="bg-green-700 text-white text-sm font-medium rounded-md px-2 py-1">
    Accept Request
  </button></>
  )
}

export default AcceptRequest
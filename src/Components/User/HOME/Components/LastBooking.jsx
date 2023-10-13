import React, { useEffect, useMemo, useState } from 'react';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';

function LastBooking() {
  const initialDetails = {
    car: [],
    journey_start_date: '',
    starting_time: '',
    from_location: '',
    locality: '',
    to_location: '',
    return_date: '',
    is_return: false,
    status: '',
  };

  const [details, setLastBooking] = useState(initialDetails);
  const userData = useSelector(selectUserData);
  const { userId } = useMemo(() => userData, [userData]);
  const axiosInstance = AxiosInstance();

  useEffect(() => {
    axiosInstance
      .get(`/last-booking/${userId}`)
      .then((response) => {
        setLastBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching last booking details:', error);
      });
  }, []);

  return (
    <>
      <div className="flex w-full bg-slate-600">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium text-white">Last Booking Details</p>
      </div>
      <div>
        <div className="bg-white rounded-lg shadow-lg p-4 border border-x-4 border-y-4 border-slate-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Car:</p>
              <p className="font-semibold">{details.car.make}</p>
              <p className="font-semibold">{details.car.model}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Start Date:</p>
              <p className="font-semibold">{details.journey_start_date}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Starting Time:</p>
              <p className="font-semibold">{details.starting_time}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">From Location:</p>
              <p className="font-semibold">{details.from_location}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Locality:</p>
              <p className="font-semibold">{details.locality}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">To Location:</p>
              <p className="font-semibold">{details.to_location}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Return Date:</p>
              <p className="font-semibold">{details.return_date}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Return:</p>
              <p className="font-semibold">
                {details.is_return ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Status:</p>
              <p className="font-semibold">{details.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LastBooking;

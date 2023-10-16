import React, { useEffect, useMemo, useState } from 'react';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';

function PendingPayments() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Initialize currentPage to 0
  const userData = useSelector(selectUserData);
  const { userId } = useMemo(() => userData, [userData]);
  const paymentsPerPage = 1;
  const axiosInstance = AxiosInstance();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/pending_payments?page=${currentPage}&per_page=${paymentsPerPage}&user_id=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setPendingPayments(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [ userId]);

  console.log(pendingPayments);
  
  const handleNextPage = () => {
    if (currentIndex + 1 < pendingPayments.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentPayment = pendingPayments[currentIndex] || {};
  return (
    <>
      <div className="flex w-full bg-slate-600 text-gray-50">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium">Payments pending</p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 border border-x-4 border-y-4 border-slate-200">
        <div className="w-full card">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Trip ID</p>
              <p className="font-semibold">{currentPayment.id}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">From</p>
              <p className="font-semibold">{currentPayment.from_location}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">To</p>
              <p className="font-semibold">{currentPayment.to_location}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Started On:</p>
              <p className="font-semibold">{currentPayment.started_on}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Ended On</p>
              <p className="font-semibold">{currentPayment.ended_on}</p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <p className="text-gray-600">Total Fare</p>
              <p className="font-semibold">{currentPayment.total_fare}</p>
            </div>
          </div>
          <button
            onClick={() => handlePayNow(currentPayment.trip_id)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 focus:outline-none"
          >
            Pay Now
          </button>
        </div>
        <div className='flex mt-3 justify-end'>
        {pendingPayments.length > 1 && currentIndex != 0 && (
          <button
          onClick={handlePreviousPage}
          className="text-xs font-semibold bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 focus:outline-none"
          disabled={currentIndex === 0}
        >
          Prev
        </button> )}
        {pendingPayments.length > 1 && currentIndex != pendingPayments.length - 1 && (
        <button
        onClick={handleNextPage}
        className="text-xs font-semibold bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 focus:outline-none"
        disabled={currentIndex === pendingPayments.length - 1}
        >
        Next
        </button>)}
        </div>
        
      </div>
    </>
  );
}

export default PendingPayments;

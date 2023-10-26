import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from './../../Redux/authSlice';
import React, { useEffect, useState } from 'react';
import AxiosInstance from './../../CustomAxios/axiosInstance'; 
import Swal from 'sweetalert2';
import Modal from 'react-modal';

function StartTrip(trip_request_id,tripRequest) {

    console.log(tripRequest)

    const axiosInstance = AxiosInstance();
    const userData = useSelector(selectUserData);
    const isDriver = userData.is_driver;
    const userId = userData.userId;
    console.log("userID",userId)
    const [isStartTripModalOpen, setStartTripModalOpen] = useState(false);

    const handleSubmitStart = () => {
        axiosInstance
        .post('start_odometer_initial/', {
          initial_odometer: tripRequest.initial_odometer, // Send just the initial odometer reading
          trip_request_id: tripRequest.trip_request_id, // Also send the trip_request_id
        })
        .then((response) => {
          Swal.fire({
            title: 'Success',
            text: 'Trip Started Successfully.',
            icon: 'success',
          })
          closeStartTripModal();
          console.log('Initial odometer reading submitted successfully:', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error submitting initial odometer reading:', error);
        });
      }


      const openStartTripModal = () => {
        const currentDate = new Date(); // Get the current date
        const journeyStartDate = new Date(tripRequest.journey_start_date); // Parse the journey start date
      
        // Check if the journey start date is today
        // if (
        //   journeyStartDate.getDate() === currentDate.getDate() &&
        //   journeyStartDate.getMonth() === currentDate.getMonth() &&
        //   journeyStartDate.getFullYear() === currentDate.getFullYear()
        // ) {
          setStartTripModalOpen(true);
        // } else {
        //   // Display a SweetAlert indicating that the trip cannot be started today
        //   Swal.fire({
        //     icon: 'info',
        //     title: 'Cannot Start Trip',
        //     text: 'You can only start the trip on the journey start date.',
        //   });
        // }
      };
      const closeStartTripModal = () => {
        setStartTripModalOpen(false);
      };

      const handleInitialOdometerChange = (e) => {
        // Use the spread operator to copy the current state and update the initial odometer reading
        setTripRequest({
          ...tripRequest,
          initial_odometer: e.target.value,
        });
      };

  return (
    <div>
        <button onClick={openStartTripModal}
                className="ml-2 bg-green-600 text-white text-sm font-medium rounded-md px-2 py-1"
              >
                Start Trip
              </button>
              <Modal
  isOpen={isStartTripModalOpen}
  onRequestClose={closeStartTripModal}
  className="modal"
>
  <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Start Trip Confirmation</h2>
      <div className="mb-4">
        <label htmlFor="initialOdometer" className="block">
          Initial Odometer Reading:
        </label>
        <input
          required
          type="number"
          id="initial_odometer"
          name="initial_odometer"
          value={tripRequest.initial_odometer}
          onChange={handleInitialOdometerChange}
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Add additional content and buttons for the modal here */}
      <div className="flex justify-between">
        <button
          onClick={closeStartTripModal}
          className="p-2 bg-gray-300 text-gray-700 rounded-md hover-bg-gray-400"
        >
          Close
        </button>
        <button
          onClick={handleSubmitStart} // Replace handleSubmit with your submit function
          className="p-2 bg-green-500 text-white rounded-md hover-bg-green-600"
        >
          Submit
        </button>
      </div>

    </div>
  </div>
</Modal>
    </div>
  )
}



export default StartTrip
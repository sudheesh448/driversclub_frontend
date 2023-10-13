// TripRequestDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './../../Components/CustomAxios/axiosInstance'; 
import bookmark from './../../assets/Static/Icons/bookmark.png';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from './../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const TripRequestDetail = () => {
  const { trip_request_id } = useParams();
  const [tripRequest, setTripRequest] = useState(null);
  const axiosInstance = AxiosInstance();

  const userData = useSelector(selectUserData);
  const isDriver = userData.is_driver;
  const userId = userData.userId;
  console.log("userID",userId)
  const [isStartTripModalOpen, setStartTripModalOpen] = useState(false);
  const [isEndTripModalOpen, setEndTripModalOpen] = useState(false);



  useEffect(() => {
    // Fetch trip request details using the trip_request_id from URL parameters
    axiosInstance
      .get(`tripdetail/${trip_request_id}`)
      .then((response) => {
        console.log('Trip request details:', response.data);
        setTripRequest(response.data);
        console.log("trip req state:",tripRequest)
      })
      .catch((error) => {
        console.error('Error fetching trip request details:', error);
      });
  }, [trip_request_id]);

  console.log("trip id::",trip_request_id);
  

  if (!tripRequest) {
    return (
      <div>Loading...</div> // You can replace this with your preferred loading indicator
    );
  }

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
            trip_id: trip_request_id, 
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


  
  const openStartTripModal = () => {
    setStartTripModalOpen(true);
  };
  
  const closeStartTripModal = () => {
    setStartTripModalOpen(false);
  };

  const openEndTripModal = () => {
  setEndTripModalOpen(true);
};

const closeEndTripModal = () => {
  setEndTripModalOpen(false);
};

  
  const handleInitialOdometerChange = (e) => {
    // Use the spread operator to copy the current state and update the initial odometer reading
    setTripRequest({
      ...tripRequest,
      initial_odometer: e.target.value,
    });
  };

  const handleTripEnd = (e) => {
    const { name, value } = e.target;
    setTripRequest({
      ...tripRequest,
      [name]: value,
    });
  };


  const handleSubmitEnd = () => {
    Swal.fire({
      title: 'Confirm Total Fare',
    text: `Are you sure you want to set the total fare to $${tripRequest.total_fare}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    }).then((result) => {if (result.isConfirmed) {
      axiosInstance
        .post('end_trip/', {
          final_odometer: tripRequest.final_odometer,
          total_fare: tripRequest.total_fare,
          trip_request_id: tripRequest.trip_request_id,
        })
        .then((response) => {
          Swal.fire({
            title: 'Trip Ended',
            text: 'Invoice Generated.',
            icon: 'success',
          });
          closeEndTripModal();
          window.location.reload();
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while ending the trip.',
            icon: 'error',
          });
          // Handle the error and show an error message as needed.
        });
    }
  });
};


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
  
  return (
    <>
    <Navbar/>
    <div className=" shadow=2xl  pt-4 mt-3 ">
      <div className="bg-200 rounded-lg shadow-md mt-6  ">
        <div className='flex w-full bg-gray-500 shadow-xl '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <h1 className="text-2xl font-semibold mb-4 text-white shadow-gray-500 mt-2 shadow-xl ">Trip Request Details</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center justify-center mt-2 ml-4 md:ml-40">
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Posted by:</h3>
            <p className="text-blue-500">{tripRequest.user.username}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">From Location:</h3>
            <p className='font-bold text-lg text-red-500'>{tripRequest.from_location} <span>- {tripRequest.locality}</span></p>
            
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">To Location:</h3>
            <p className='font-bold text-lg text-red-500'  >{tripRequest.to_location}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Posted On:</h3>
            <p>{tripRequest.posted_on}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Journey Start Date:</h3>
            <p className='font-bold text-lg text-red-500'>{tripRequest.journey_start_date}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Starting Time:</h3>
            <p className='font-bold text-lg text-red-500'>{tripRequest.starting_time}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Status:</h3>
            <p className='font-bold text-lg text-red-500'>{tripRequest.status}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Total Fare:</h3>
            <p>{tripRequest.total_fare}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Payment Status:</h3>
            <p className='text-lg font-bold text-red-500'>{tripRequest.payment_status}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Payment Method:</h3>
            <p>{tripRequest.payment_method}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Payment ID:</h3>
            <p>{tripRequest.payment_id}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Car:</h3>
            <p>{tripRequest.car.make} {tripRequest.car.model}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Initial Odometer:</h3>
            <p>{tripRequest.initial_odometer}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Final Odometer:</h3>
            <p>{tripRequest.final_odometer}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Return Date:</h3>
            <p>{tripRequest.return_date}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Is Return:</h3>
            <p>{tripRequest.is_return ? 'Yes' : 'No'}</p>
          </div>
          <div className="col-span-3 md:col-span-1">
            <h3 className="text-sm text-gray-600 font-semibold">Accepted by driver:</h3>
            <p>{tripRequest.confirmed_driver }</p>
          </div>
          

          <div className="col-span-3 text-center mb-2">
          {isDriver && tripRequest.status !== 'Confirmed' && tripRequest.initial_odometer === 'None' && (
            <button onClick={handleAcceptRequest} className="bg-green-700 text-white text-sm font-medium rounded-md px-2 py-1">
              Accept Request
            </button>
            )}

          {!isDriver && tripRequest.status === 'Pending' && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && tripRequest.user.user_id===userId && (
            <button onClick={handleAcceptRequest} className="bg-green-700 text-white text-sm font-medium rounded-md px-2 py-1">
              Withdraw Request
            </button>
            )}


            {tripRequest.driver_id === userId && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' &&(
              <button
              onClick={handleRepoolRequest}
                className="ml-2 bg-red-600 text-white text-sm font-medium rounded-md px-2 py-1"
              >
                Repool Request
              </button>
            )}

        {isDriver && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' &&(
              <button onClick={openStartTripModal}
                className="ml-2 bg-green-600 text-white text-sm font-medium rounded-md px-2 py-1"
              >
                Start Trip
              </button>)}
              {isDriver && tripRequest.status === 'Started' && tripRequest.initial_odometer !== 'None' && (
              <button
                onClick={openEndTripModal}
                className="ml-2 bg-red-600 text-white text-sm font-medium rounded-md px-2 py-1"
              >
                End Trip
              </button>
              )}

          </div>
          
        </div>
      </div>
    </div>
    <Footer/>

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

<Modal
  isOpen={isEndTripModalOpen}
  onRequestClose={closeEndTripModal}
  className="modal"
>
  <div className="flex justify-center items-center h-screen">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">End Trip Confirmation</h2>
     <label htmlFor="FinalOdometer" className="block mt-2">
          Final Odometer Reading:
        </label>
        <input
          required
          type="number"
          id="final_odometer"
          name="final_odometer"
          value={tripRequest.final_odometer}
          onChange={handleTripEnd}
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <label htmlFor="TotalFare" className="block mt-2">
          Total Fare:
        </label>
        <input
          required
          type="number"
          id="total_fare"
          name="total_fare"
          onChange={handleTripEnd}
          value={tripRequest.total_fare}
          
          className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      <div className="mt-2 flex justify-between">
        <button
          onClick={closeEndTripModal}
          className="p-2 bg-gray-300 text-gray-700 rounded-md hover-bg-gray-400"
        >
          Close
        </button>
        {/* Replace handleSubmitEnd with your submit function for ending the trip. */}
        <button
          onClick={handleSubmitEnd}
          className="p-2 bg-red-500 text-white rounded-md hover-bg-red-600"
        >
          Generate Invoice
        </button>
      </div>
    </div>
  </div>
</Modal>
</>
  );
};

export default TripRequestDetail;

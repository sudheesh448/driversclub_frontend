import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from './../../Components/CustomAxios/axiosInstance';
import Footer from '../Footer/Footer';
import Navbar from '../NavBar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from './../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import Icons from '../Driver/Driver_Home/DriverComponents/Icons';
import IconsMenu from '../User/HOME/Components/IconsMenu';
import UserProfile from './TripRequestDetailComponents/UserProfile';
import Detail from './TripRequestDetailComponents/Detail';
import HeaderImage from './TripRequestDetailComponents/HeaderImage';
import AcceptRequest from './TripRequestDetailComponents/AcceptRequest';
import Withdraw from './TripRequestDetailComponents/Withdraw';
import Repool from './TripRequestDetailComponents/Repool';
import DriverProfile from './TripRequestDetailComponents/DriverProfile';
import Accessdenied from './TripRequestDetailComponents/Animations/LoadingAnimation';
import NotFound from './TripRequestDetailComponents/Animations/404NotFound';
import AdminIcons from '../Admin/AdminDashboard/DashboardComponents/Animation/AdminIcons';
import ChatButton from '../Chat/ChatButton';
import sendWebSocketMessage from './../Notification/SendWebSocketFunction';


const TripRequestDetail = () => {
  const { trip_request_id } = useParams();
  const [tripRequest, setTripRequest] = useState(null);
  const axiosInstance = AxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(selectUserData);
  const isDriver = userData.is_driver;
  const isAdmin = userData.is_super;
  const userId = userData.userId;
  const name = userData.name;
  console.log("userID", userId);
  const [isStartTripModalOpen, setStartTripModalOpen] = useState(false);
  const [isEndTripModalOpen, setEndTripModalOpen] = useState(false);
  const [is590,set590]=useState(false)

  useEffect(() => {
    // Fetch trip request details using the trip_request_id from URL parameters
    axiosInstance
    .get(`tripdetail/${trip_request_id}`, {
      params: {
        userId: userId, // Include the user ID as a parameter
      }
    })
      .then((response) => {
        console.log('Trip request details:', response.data);
        setTripRequest(response.data);
        console.log("trip req state:", tripRequest);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 590) {
          console.error('Custom Error 590:', error);
          set590(true)
        } else {
          console.error('Error fetching trip request details:', error);
          // Handle other errors
        }
      });
  }, [trip_request_id]);

  console.log("trip id::", trip_request_id);
  

console.log(is590)

  if (!tripRequest && !is590) {
    return (
      <div className=' items-center'>
        <Navbar/>
        <div className=' w-full justify-center items-center text-center flex'>
          <NotFound/>
          </div>
          <h1 className='font-bold text-3xl text-red-600 text-center'>No Data Found In Our Data Base</h1>
      </div> // You can replace this with your preferred loading indicator
    );
  }

  if (!tripRequest && is590) {
    return (
      <div className=' items-center'>
        <Navbar/>
        <div className=' w-full justify-center items-center text-center flex'>
          < Accessdenied/>
          </div>
          <h1 className='font-bold text-3xl text-red-600 text-center'>Access Denied</h1>
      </div> // You can replace this with your preferred loading indicator
    );
  }

  const openStartTripModal = () => {
    const currentDate = new Date(); // Get the current date
    const journeyStartDate = new Date(tripRequest.journey_start_date); // Parse the journey start date

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
    }).then((result) => {
      if (result.isConfirmed) {
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
          });
      }
    });
  };

  const handleSubmitStart = () => {
    axiosInstance
      .post('start_odometer_initial/', {
        initial_odometer: tripRequest.initial_odometer,
        trip_request_id: tripRequest.trip_request_id,
      })
      .then((response) => {
        Swal.fire({
          title: 'Success',
          text: 'Trip Started Successfully.',
          icon: 'success',
        });
        closeStartTripModal();
        console.log('Initial odometer reading submitted successfully:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error submitting initial odometer reading:', error);
      });
  };


  console.log("handle accept ::",tripRequest.user.user_id)
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
          const roomName = tripRequest.user.user_id; // Replace with the actual room name
          const messageContent = `Your trip Id: ${trip_request_id} is accepted by : ${name}`;
          sendWebSocketMessage(roomName, messageContent);

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
    <>
      <Navbar />
      <div className='w-full hidden md:flex'>
        <div className='w-1/3'>
          <div>
          {!isAdmin ? (
            isDriver ? (
              <div className=' border-sky-900 border-t-8 border-r-8 mt-12'><Icons /></div>
            ) : (
              <div className='mt-12  border-sky-900 border-t-8 border-r-8 '><IconsMenu /></div>
            ) ):(
              <div className='mt-12 bg-sky-900'></div>
            )}
          </div>

          
          <div className='bg-sky-900 w-full h-screen'>
          {!isAdmin ? (
            isDriver ? (
              <UserProfile TripRequest={tripRequest} />
            ) : (
              <DriverProfile TripRequest={tripRequest} />
            )
          ) : (
            <div className='flex '>
              <div className='bg-stone-100 pb-16 pt-4'>
                <AdminIcons/>
              </div>
              <div className='pr-2 pl-2 mt-8'>
              <UserProfile TripRequest={tripRequest} />
              </div>
              <div className='pr-2 pl-2 mt-8'>
              <DriverProfile TripRequest={tripRequest} />
              </div>
            </div> 
          )}
          </div>
        </div>
        <div className='w-2/3'>
          <div className="shadow=2xl pt-4 mt-3 ">
            <div className="bg-200 rounded-lg shadow-md mt-6  ">
              <HeaderImage />
            
              <div className="grid grid-cols-3 gap-4 items-center justify-center mt-4 ml-4 mr-4  ">
                <Detail
                  tripRequest={tripRequest}
                />
                <div className="col-span-3 text-center mb-4 flex">
                  {  !isLoading && isDriver && tripRequest.status !== 'Confirmed' && tripRequest.initial_odometer === 'None' && !isAdmin && (
                    <><button onClick={handleAcceptRequest} className="bg-green-700 text-white text-sm font-medium rounded-md px-2 py-1">
                    Accept Request
                  </button></>
                  )}
                  {!isDriver && !isAdmin && tripRequest.status === 'Pending' && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && tripRequest.user.user_id === userId && (
                    <Withdraw />
                  )}
                  {!isDriver && !isAdmin && tripRequest.status === 'Confirmed' && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && tripRequest.user.user_id === userId && (
                    <ChatButton driver_id={tripRequest.driver_id} user_id={userId}/>
                  )}
                  {tripRequest.driver_id === userId && !isAdmin &&  tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && (
                   <div>
                   <Repool
                      trip_request_id={trip_request_id}
                    />
                    <ChatButton user_id={tripRequest.user.user_id} driver_id={userId}/>
                    </div>
                    
                  )}
                  {isDriver && !isAdmin && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && (
                    <button onClick={openStartTripModal}
                      className="ml-2 bg-green-600 text-white text-sm font-medium rounded-md px-2 py-1"
                    >
                      Start Trip
                    </button>)}
                  {isDriver && !isAdmin && tripRequest.status === 'Started' && tripRequest.initial_odometer !== 'None' && (
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
        </div>
      </div>

      <div className='md:hidden'>
      <div>
            {isDriver ? (
              <div className=' border-sky-900 border-t-8  border-r-8 mt-12'><Icons /></div>
            ) : (
              <div className='mt-12  border-sky-900  border-t-8 border-r-8 '><IconsMenu /></div>
            )}
          </div>
          <div className='bg-sky-900 w-full mb-2'>
              {isDriver ? (
                <UserProfile TripRequest={tripRequest} />
          
            ) : (
              <DriverProfile TripRequest={tripRequest} />
          )}
          </div>
          <HeaderImage />

          <div className="grid grid-cols-3 gap-4 items-center justify-center mt-2 ml-4 mr-4 ">
                <Detail
                  tripRequest={tripRequest}
                />
                <div className="col-span-3 text-center mb-2 flex">
                  {isDriver && tripRequest.status !== 'Confirmed' && tripRequest.initial_odometer === 'None' && (
                    <AcceptRequest
                      trip_request_id={trip_request_id}
                    />
                  )}
                  {!isDriver && tripRequest.status === 'Pending' && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && tripRequest.user.user_id === userId && (
                    <Withdraw />
                  )}
                  {tripRequest.driver_id === userId && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && (
                    <Repool
                      trip_request_id={trip_request_id}
                    />
                  )}
                  {isDriver && tripRequest.status === 'Confirmed' && tripRequest.initial_odometer === 'None' && (
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
      <Footer />
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
            <div className="flex justify-between">
              <button
                onClick={closeStartTripModal}
                className="p-2 bg-gray-300 text-gray-700 rounded-md hover-bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleSubmitStart}
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

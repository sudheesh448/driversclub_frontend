import React, { useState, useEffect } from 'react';
import AxiosInstance from './../../../CustomAxios/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TripRequestCard = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const axiosInstance = AxiosInstance();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  
  const [responseStatus, setResponseStatus] = useState(200);
  const perPage = 10; // Number of items per page
  const navigate = useNavigate()

  const fetchPendingRequests = (page) => {
    axiosInstance
      .get('request_pool', {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("request pool data",response.data)
          setPendingBookings(response.data.results);
          console.log("pendingp",response.data.results);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResponseStatus(404);
        if (currentPage > 1 && error.response && error.response.status === 404) {
          setCurrentPage(currentPage - 1);
        }
        Swal.fire({
          icon: 'info',
          title: 'No more request',
          text: 'There are no more pending trip requests.',
        });
      });
  };

  useEffect(() => {
    fetchPendingRequests(currentPage);
  }, [currentPage]);

  
  const changePage = (newPage) => {
    setCurrentPage(newPage); // Update the current page
  };
  


  // useEffect(() => {
  //   // Fetch pending bookings data within the component
  //   axiosInstance.get('view_all-pending')
  //     .then((response) => {
  //       const formattedData = response.data.map((booking) => {
  //         const postedDate = new Date(booking.posted_on).toLocaleDateString(); // Format posted_on date
  //         const journeyDate = new Date(booking.journey_start_date).toLocaleDateString(); // Format journey_start_date
  //         const returnDate = new Date(booking.return_date).toLocaleDateString(); // Format return_date

  //         return {
  //           ...booking,
  //           postedDate,
  //           journeyDate,
  //           returnDate,
  //         };
  //       });

  //       setPendingBookings(formattedData);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
console.log("pending::::::",pendingBookings);
  return (

    <div className='shadow-2xl md:w-1/3 flex mr-2 items-center flex-col mb-2 mt-2 rounded-md px-2 ml-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-indigo-200 via-yellow-200 to-emerald-800'>
      <h1 className="text-zinc-600 font-bold text-xl mb-1 mt-3">Request pool</h1>
      {pendingBookings.slice(0, 10).map((request) => {
      console.log('triprequest id:', request.id); // Add this line to log the id
      return (
        <TripRequestCardItem key={request.id} request={request} />
      );
    })}
      <div>
      <h1 className="text-zinc-600 font-bold text-sm mb-1 mt-3">
        <Link to="/driver/requestpool">View more&gt;&gt;&gt;</Link>
      </h1>
    </div>
    </div>
  );
};




const TripRequestCardItem = ({ request }) => {

  const navigate = useNavigate()

  const handleViewClick = () => {
    navigate(`/trip_request_detail/${request.id}`);
  };

  // const handleViewClick = () => {
  //   // Make an API call with the request ID
  //   AxiosInstance()
  //     .get(`tripdetail/${request.id}`)
  //     .then((response) => {
  //       console.log("success");
  //       console.log(response.data)
  //       navigate(`/trip_request_detail/${request.id}`, { requestData: response.data });
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching detailed data:', error);
  //     });
  // };


  return (
    <div className="w-full h-auto mx-4 my-1 bg-white rounded-lg p-2 shadow-md">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="text-xs text-gray-600 font-semibold">
            Posted by <span className="text-blue-500">{request.first_name}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-gray-600 font-medium">
             On <span className="text-blue-500">{request.posted_on}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-gray-600 font-medium">
            Car <span className="text-blue-500">{request.car.make} {request.car.model}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-gray-600">
            From <span className="text-blue-500">{request.from_location}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-gray-600">
            To <span className="text-blue-500">{request.to_location}</span>
          </h3>
        </div>
        <div>
          <h3 className="text-sm text-gray-600">
            Return <span className="text-blue-500">{request.return_date}</span>
          </h3>
        </div>
        <div colSpan="3">
          <h3 className="text-sm text-gray-600 font-bold">
            Date <span className="text-red-500">{request.journey_start_date}</span>
          </h3>
        </div>
        
        <div className="col-start-3 col-span-1">
          <button onClick={handleViewClick} className="bg-blue-500 text-white text-sm font-medium rounded-md ml-2 px-2 py-1">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripRequestCard;

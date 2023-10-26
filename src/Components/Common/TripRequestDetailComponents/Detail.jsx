import React from 'react'

function Detail({tripRequest}) {
  return (
    <>
    {/* <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Posted by:</h3>
            <p className="text-white">{tripRequest.user.username}</p>
          </div> */}
          <div className="col-span-3 md:col-span-1 bg-sky-900 drop-shadow-2xl shadow-2xl p-4">
            <h3 className="text-sm text-white font-semibold">From Location:</h3>
            <p className='font-bold text-lg text-green-400'>{tripRequest.from_location} <span>- {tripRequest.locality}</span></p>
            
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">To Location:</h3>
            <p className='font-bold text-lg text-green-400'  >{tripRequest.to_location}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4 ">
            <h3 className="text-sm text-white font-semibold">Posted On:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.posted_on}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4 ">
            <h3 className="text-sm text-white font-semibold">Journey Start Date:</h3>
            <p className='font-bold text-lg text-green-400'>{tripRequest.journey_start_date}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900  p-4">
            <h3 className="text-sm text-white font-semibold">Starting Time:</h3>
            <p className='font-bold text-lg text-green-400'>{tripRequest.starting_time}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Is Return:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.is_return ? 'No' : 'Yes'}</p>
          </div>
          
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Return Date:</h3>
            {!tripRequest.is_return && (
            <p className='font-bold text-lg text-green-400'>{tripRequest.return_date}</p>
            )}
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Status:</h3>
            <p className='font-bold text-xl text-yellow-500'>{tripRequest.status}</p>
          </div>
            <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Total Fare:</h3>
            {tripRequest.total_fare !== 'None' ? (
             <p className='font-bold text-lg text-rose-300'>{tripRequest.total_fare}</p>
                ) : null}
         </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Payment Status:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.payment_status}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Payment Method:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.payment_method}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Payment ID:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.payment_id}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Car:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.car.make} {tripRequest.car.model}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Initial Odometer:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.initial_odometer}</p>
          </div>
          <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-white font-semibold">Final Odometer:</h3>
            <p className='font-bold text-lg text-rose-300'>{tripRequest.final_odometer}</p>
          </div>
          
          
          {/* <div className="col-span-3 md:col-span-1 bg-sky-900 p-4">
            <h3 className="text-sm text-gray-600 font-semibold">Accepted by driver:</h3>
            <p>{tripRequest.confirmed_driver }</p>
          </div> */}
    
    </>
  )
}

export default Detail
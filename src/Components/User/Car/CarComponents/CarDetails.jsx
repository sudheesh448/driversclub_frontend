import React, { useEffect, useState } from 'react'
import AxiosInstance from './../../../../Components/CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import { BASE_IMAGE_URL } from '../../../Common/BaseUrl';

function CarDetails() {
  const axiosInstance = AxiosInstance();
  const [cars, setCars] = useState([]);
  const userData = useSelector(selectUserData);
  const { userId } = userData;



  useEffect(() => {
    fetchCarsForUser();
  }, [ userId]);
  
  const fetchCarsForUser = () => {
    axiosInstance
      .get(`/cars/${userId}`)
      .then((response) => {
        setCars(response.data.cars);
        console.log("car hii",response.data)
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  };

  
  
  return (
    <>
    <div className="md:grid grid-cols-2 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="bg-sky-800 p-4 mx-4 my-4 flex shadow-2xl rounded-lg shadow-lg">
          <div className='w-1/2'>
          <img
              src={car.photo
                ? (car.photo instanceof File || car.photo instanceof Blob)
                  ? URL.createObjectURL(car.photo)
                  : `${BASE_IMAGE_URL}${car.photo}` 
                : ''}
              alt={`Car ${car.make} ${car.model}`}
              className="w-32 h-32 border border-white rounded-full mx-auto mb-4"
          />
          </div>
          <div>
          <h3 className="text-white text-lg font-semibold">{`${car.make} ${car.model}`}</h3>
          <p className="text-white">{`Year: ${car.year_of_make}`}</p>
          <p className="text-white">{`Register Number: ${car.register_number}`}</p>
          <p className="text-white">{`Owner ID: ${car.owner}`}</p>
        </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default CarDetails
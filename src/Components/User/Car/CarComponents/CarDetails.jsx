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
    <div className="grid grid-cols-2 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="bg-white p-4 rounded-lg shadow-lg">
          <img
              src={car.photo
                ? (car.photo instanceof File || car.photo instanceof Blob)
                  ? URL.createObjectURL(car.photo)
                  : `${BASE_IMAGE_URL}${car.photo}` 
                : ''}
              alt={`Car ${car.make} ${car.model}`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">{`${car.make} ${car.model}`}</h3>
          <p className="text-gray-600">{`Year: ${car.year_of_make}`}</p>
          <p className="text-gray-600">{`Register Number: ${car.register_number}`}</p>
          <p className="text-gray-600">{`Owner ID: ${car.owner}`}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default CarDetails
import React, { useState } from 'react';
import AxiosInstance from '../CustomAxios/axiosInstance';
import { useSelector } from 'react-redux';
import { selectUserData } from './../../Components/Redux/authSlice';

function NotificationButton() {
  const [recieverName, setRecieverName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector(selectUserData);
  const id_forname = userData.userId;
  const axiosInstance=AxiosInstance()

  const fetchData = async () => {
    setIsLoading(true);
    try {
      
      const response = await axiosInstance.get(
        `/name/${id_forname}/`, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        console.log(response.data)
        setRecieverName(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Data'}
      </button>
      <div>{recieverName && `Receiver Name: ${recieverName}`}</div>
    </div>
  );
}

export default NotificationButton;

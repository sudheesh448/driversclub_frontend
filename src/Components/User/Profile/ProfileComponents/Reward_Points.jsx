import React, { useEffect, useState } from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import wallet from './../../../../assets/Static/Icons/Wallet.png'
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import rewardlogo from './../../../../assets/Static/Icons/Rewards.png';
import { Pie, Doughnut,Bar } from 'react-chartjs-2';
import {Chart, ArcElement, Tooltip, Legend, Title} from 'chart.js';
import {  registerables } from 'chart.js';
Chart.register(...registerables);
Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = '';
Chart.defaults.plugins.legend.title.font = 'Helvetica Neue';



function Reward_Points() {
const userData = useSelector(selectUserData); // Replace with the selector that accesses user data in Redux
const { userId } = userData;
const axiosInstance = AxiosInstance()

const [statistics, setStatistics] = useState({
  pending_requests: 0,
  confirmed_requests: 0,
  disposed_requests: 0,
  completed_requests: 0,
});

useEffect(() => {
  const fetchStatistics = async () => {
    try {  
      const response = await axiosInstance.get(`user/statics/${userId}`);
      console.log("reward",response.data)
      setStatistics(response.data); 
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };
  fetchStatistics(); 
}, [userId]);

const pieData = {
  labels: ['Pending', 'Completed','Inprogress','Disposed'],
  datasets: [
    {
      data: [statistics.pending_requests, statistics.completed_requests,statistics.confirmed_requests,statistics.disposed_requests],
      backgroundColor: ['#ff0000','#008000','#4933FF', '#353839'],
    },
  ],
};
const pieOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true, // Hide default legend
    },
    cutout: 0, // Set cutout to 0 for a Pie chart (no hole in the center)
    tooltip: {
      callbacks: {
          label: (context) => {
              const label = pieData.labels[context.dataIndex];
              const value = pieData.datasets[0].data[context.dataIndex];
              return `${label}: ${value}`;
            },
      },
    },
  },
};


  return (
    <>
    <div className="flex w-full bg-slate-600 text-gray-50">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium">Your Statitics</p>
      </div>
    
      
      
      
      <div className="chart-container p-2 md:w-full my-2 mx-2" style={{  padding: '10px', borderRadius: '5px' }}>
    <Pie data={pieData} options={pieOptions} />
    </div>
      
                
               
    </>
  )
}

export default Reward_Points
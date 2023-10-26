import React, { useEffect, useState } from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import wallet from './../../../../assets/Static/Icons/Wallet.png'
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';

function Wallet_profile() {

  const [walletBalance, setWalletBalance] = useState(null);
  const axiosInstance = AxiosInstance();
  const userData = useSelector(selectUserData);
  const  userId  = userData.userId 

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axiosInstance.post('fetch_wallet_balance/', {
          userId: userId, // Include the userId in the POST data
        });
        setWalletBalance(response.data.wallet_balance.toFixed(2));
      } catch (error) {
        // Handle any error here
        console.error('Error fetching wallet balance:', error);
      }
    };
  
    // Call the API function
    fetchWalletBalance();
  }, []);

 
    console.log("wallet balance2", walletBalance);
  

  return (
    <>
    <div className="flex w-full bg-slate-600 text-gray-50">
        <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
        <p className="font-medium">Wallet</p>
      </div>
        <div className='bg-white p-4 rounded-lg shadow flex '>
                <div>
                    <img className='w-44' src={wallet} alt="" />
                </div>
                <div className='w-full flex' >
                  <div className='  flex flex-col items-center w-2/3   '>
                  <div className=' text-center '>
                  <h3 className='font-bold text-lg text-slate-600' >Wallet Balance</h3>
                  </div>
                  <div>
                  <h3 className='font-bold text-4xl text-slate-600' > ₹ {walletBalance} /-</h3>
                  </div>
                  </div>
                  <div className=' flex flex-col items-end justify-end w-1/3 '>
                    <div className='mb-2'>
                    <a href="#_" class="relative inline-flex items-center justify-start inline-block px-5 py-1 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-red-700 group">
                        <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-red-900 rounded-full"></span>
                        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Transactions</span>
                        </a>
                    </div>
                    <div>
                  
                      <a href="#_" class="relative inline-flex items-center justify-start inline-block px-5 py-1 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-red-700 group">
                        <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-red-900 rounded-full"></span>
                        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">+ Money</span>
                        </a>
                    </div>
                  </div>
                  
                </div>
              </div>
    </>
  )
}

export default Wallet_profile
import React, { useEffect, useState } from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
import AxiosInstance from './../../../CustomAxios/axiosInstance';
import wallet from './../../../../assets/Static/Icons/Wallet.png'
import { useSelector } from 'react-redux';
import { selectUserData } from './../../../Redux/authSlice';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

function Wallet_profile() {

  const [walletBalance, setWalletBalance] = useState(null);
  const axiosInstance = AxiosInstance();
  const userData = useSelector(selectUserData);
  const  userId  = userData.userId 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [bankTransferData, setBankTransferData] = useState({
    bankName: '',
    bankBranch: '',
    ifsc: '',
    accountNumber: '',
    accountHolderName: '',
    amount: '',
    userId:'23',
  });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
console.log(walletBalance)
  const handleBankTransfer = async (e) => {
    e.preventDefault();
    console.log(bankTransferData);
  
    // Create a SweetAlert confirmation dialog
    const { value: confirm } = await Swal.fire({
      title: 'Confirm Transfer',
      html: `
        <div style="background-color: #001f52; padding: 10px; border-radius: 10px;">
          <div style="color: white;">Bank Name:  ${bankTransferData.bankName}</div>
          <div style="color: white;">Bank Branch:  ${bankTransferData.bankBranch}</div>
          <div style="color: white;">IFSC: ${bankTransferData.ifsc}</div>
          <div style="color: white;">Account Number: ${bankTransferData.accountNumber}</div>
          <div style="color: white;">Account Holder Name: ${bankTransferData.accountHolderName}</div>
          <div style="color: white;">Amount: ${bankTransferData.amount}</div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    });
  
    if (confirm) {
      try {
        const response = await axiosInstance.post('banktransfer_request/', {
          bankTransferData: bankTransferData,
        });
  
        // Check the response status
        if (response.status === 201) {
          // Successful transfer
          Swal.fire({
            icon: 'success',
            title: 'Transfer Successful',
            text: 'Your bank transfer has been completed successfully.',
          });
          const newBalance = walletBalance - parseFloat(bankTransferData.amount);
          setWalletBalance(newBalance);
          closeModal(); // Close the modal after a successful transfer
        } 
      } catch (error) {
        if (error.response.status === 589) {
          // Insufficient balance message
          Swal.fire({
            icon: 'error',
            title: 'Insufficient Balance',
            text: 'You do not have enough balance in your wallet.',
          });
        } 
        console.error('Error Transfer req balance:', error);
      }
    }
  };
  
   
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankTransferData({ ...bankTransferData, [name]: value });
    console.log("bank transfer",bankTransferData)
  };

 
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
                    <a href="#_" class="relative inline-flex items-center justify-start  px-5 py-1 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-red-700 group">
                        <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-red-900 rounded-full"></span>
                        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Transactions</span>
                        </a>
                    </div>
                    <div>
                  
                      <a onClick={openModal} href="#_" class="relative inline-flex items-center justify-start  px-3 py-1  overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-red-700 group">
                        <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-red-900 rounded-full"></span>
                        <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">TransferMoney</span>
                        </a>
                    </div>
                  </div>
                </div>
              </div>

              <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Bank Transfer Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow max-w-3xl min-w-1/4 overflow-y-auto"
  overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
>
  <h2 className="text-xl font-bold">Bank Transfer</h2>
  <form onSubmit={handleBankTransfer}>
    <div className="form-group mb-4">
      <label className="block">Bank Name:</label>
      <input
        type="text"
        name="bankName"
        value={bankTransferData.bankName}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="form-group mb-4">
      <label className="block">Bank Branch:</label>
      <input
        type="text"
        name="bankBranch"
        value={bankTransferData.bankBranch}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="form-group mb-4">
      <label className="block">IFSC:</label>
      <input
        type="text"
        name="ifsc"
        value={bankTransferData.ifsc}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="form-group mb-4">
      <label className="block">Account Number:</label>
      <input
        type="text"
        name="accountNumber"
        value={bankTransferData.accountNumber}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="form-group mb-4">
      <label className="block">Account Holder Name:</label>
      <input
        type="text"
        name="accountHolderName"
        value={bankTransferData.accountHolderName}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="form-group mb-4">
      <label className="block">Amount:</label>
      <input
        type="text"
        name="amount"
        value={bankTransferData.amount}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 w-full"
      />
    </div>
    <div className="flex justify-end mt-4">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-red-700 mr-2"
      >
        Submit
      </button>
      <button
        onClick={closeModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
      >
        Cancel
      </button>
    </div>
  </form>
</Modal>
    </>
  )
}

export default Wallet_profile
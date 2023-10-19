import React, { useState } from 'react';
import Modal from 'react-modal';
import bookmark from './../../../../assets/Static/Icons/bookmark.png';

function Bio() {
    const [bio, setBio] = useState(
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    );
    const [isFullText, setIsFullText] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedBio, setEditedBio] = useState(bio);
  
   
  
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setEditMode(false);
    };
  
    const startEdit = () => {
      setEditMode(true);
    };
  
    const handleBioChange = (e) => {
      setEditedBio(e.target.value);
    };
  
    const saveEditedBio = () => {
      setBio(editedBio);
      setEditMode(false);
    };
  
    return (
      <>
        <div className="bg-sky-900 shadow-2xl">
          <h1 className="text-white font-semibold py-2 px-2 font">DRIVER BIO</h1>
          <p className='px-2 font-medium text-slate-300'>
            {isFullText ? bio : bio.slice(0, 200)} {/* Limit to the first 100 characters */}
            {!isFullText && bio.length > 200 && '...'}
          </p>

            <div className='flex justify-end items-end mr-2 ml-2 mb-2' onClick={openModal }>
        
            <a href="#_" class="relative inline-flex items-center justify-start px-2 py-1 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group">
            <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">View & Edit Bio</span>
            </a>
            </div>
        </div>
        <div
          className={` z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
            modalIsOpen ? '' : 'hidden'
          }`}
        >
          <div className="bg-white p-8 w-1/2 rounded-lg shadow-lg">
            {editMode ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Edit Bio</h2>
                <textarea
                  className="w-full p-2 border border-gray-400 rounded-md h-48"
                  value={editedBio}
                  onChange={handleBioChange}
                />
                

                <div onClick={saveEditedBio}>
                <a href="#_" class="relative px-3 py-1 font-medium text-white group">
                    <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                    <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                    <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                    <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                    <span class="relative"> Save</span>
                </a>
                </div>
              </div>
            ) : (
              <div  className="shadow-2xl z-40 ">

                <div className="flex w-full bg-slate-600 text-gray-50">
                    <img className="justify-center mt-0 py-0 w-9" src={bookmark} alt="" />
                    <p className="font-medium">Full Bio</p>
                </div>
                <p className='px-2'>{bio}</p>
                <div className="flex justify-between items-center mt-4"> 
                <div className='mb-1 px-2' onClick={startEdit}>
                <a href="#_" class="relative px-3 py-1 font-medium text-white group">
                    <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                    <span class="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                    <span class="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                    <span class="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                    <span class="relative"> Edit</span>
                </a>
                </div>
                <div className='mb-1 px-2' onClick={closeModal}>
                <a href="#_" class="relative px-3 py-1 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Close</span>
                </a>
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  
  export default Bio;

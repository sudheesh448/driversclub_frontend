import React from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
function UpComing() {
  return (
    <>
        <div className=' flex w-full '>
            <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
            <p className='font-medium '>Upcoming</p> 
        </div>
    </>
  )
}

export default UpComing
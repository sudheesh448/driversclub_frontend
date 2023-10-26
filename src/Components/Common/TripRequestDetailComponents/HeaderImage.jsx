import React from 'react'
import bookmark from './../../../assets/Static/Icons/bookmark.png';
function HeaderImage() {
  return (
    <div><div className='flex w-full bg-sky-900  '>
    <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
    <h1 className="text-2xl font-semibold mb-4 text-white mt-2  ">Trip Request Details</h1>
    </div></div>
  )
}

export default HeaderImage
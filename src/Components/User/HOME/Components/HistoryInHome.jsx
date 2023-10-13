import React from 'react'
import bookmark from './../../../../assets/Static/Icons/bookmark.png';
function HistoryInHome() {
  return (
    <>
        <div className=' flex w-full '>
        <img className='justify-center mt-0 py-0 w-9' src={bookmark} alt="" />
        <p className='font-medium '>History</p>
        
    </div>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,</p>
  
    </>
  )
}

export default HistoryInHome
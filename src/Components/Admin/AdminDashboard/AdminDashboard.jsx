import React from 'react'
import Navbar from '../../../Components/NavBar/Navbar'
import AdminAnimation from './../../Admin/AdminDashboard/DashboardComponents/Animation/AdminAnimation'
import AdminIcons from './DashboardComponents/Animation/AdminIcons'

function AdminDashboard() {
  return (
    <>
    <Navbar/>
    <div>
      
    </div>
    <div className='w-full h-24 overflow-hidden mt-12 bg-sky-900 flex text-center  items-center'>
    <AdminAnimation/>
      <h3 className='font-bold text-3xl text-white '>ADMIN PANEL</h3>
    
    </div>
    
    <div className=' flex '>
        
        
        <div className=' w-24   '>
            <div className=' px-1 py-2 bg-stone-200 fixed '>
                <AdminIcons/>
            </div>
            
        </div>
        <div className='bg-sky-600 w-full m-2   '>
            dashboard
        </div>
    </div>
    </>
  )
}

export default AdminDashboard
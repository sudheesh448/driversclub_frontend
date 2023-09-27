import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User_home from './Components/User/User_home'
import Navbar  from './Components/User/Navbar'
import Footer from './Components/User/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-gradient-to-r from-blue-200 via-blue-100 to-white'>
    <Navbar/>
    
    <User_home/>
    <Footer/>
    </div>

    </>

  )
}

export default App

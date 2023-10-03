import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User_home from './Components/User/User_home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserSignupform from './Components/User/Authentication/UserSignupform.jsx'
import UserSigninForm from './Components/User/Authentication/UserSigninForm'
import OTPVerification from './Components/User/Authentication/OTPVerification'
import { useDispatch } from 'react-redux'
import {checkAccessTokenValidity} from './Components/Redux/authActions'
import DriverSignupform from './Components/User/Authentication/DriverSignupform'
import DriverOTPVerification from './Components/User/Authentication/DriverOTPVerification copy'
import Driver_home from './Components/Driver/Driver_home'
import PrivateRoutes from './Components/CustomAxios/PrivateRoutes'




function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  // Check if isAuthenticated is not present or is null, and set it to false
  if (isAuthenticated === null) {
    isAuthenticated = "false";
    localStorage.setItem("isAuthenticated", "false");
  }
  useEffect(() => {
    // Dispatch the action to check access token validity when the component mounts
    console.log("app use effect access token ckeck")
    dispatch(checkAccessTokenValidity());
  }, []);

  return (
    <>
    
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<User_home/>}/> */}
        <Route exact path="/user/register" element={<UserSignupform/>}/>
        <Route exact path="/user/signin" element={<UserSigninForm/>}/>
        <Route exact path="/user/otpverification" element={<OTPVerification/>}/>
        <Route exact path="/driver/register" element={<DriverSignupform/>}/>
        <Route exact path="/driver/otpverification" element={<DriverOTPVerification/>}/>
        {/* <Route exact path="/driver/home" element={<Driver_home/>}/> */}
        <Route path="/" exact element={<PrivateRoutes  >
          <User_home/>
        </PrivateRoutes>
      }>
          {/* <Route element={<User_home/>} path="/" exact/> */}
          <Route element={<Driver_home/>} path="/driver/home" exact/>

        </Route>

        
      </Routes>
    </Router>
    

    </>

  )
}

export default App

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserHome from './Components/User/HOME/User_home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserSignupform from './Components/Authentication/UserSignupform.jsx'
import UserSigninForm from './Components/Authentication/UserSigninForm'
import OTPVerification from './Components/Authentication/OTPVerification'
import { useDispatch } from 'react-redux'
import DriverSignupform from './Components/Authentication/DriverSignupform'
import DriverOTPVerification from './Components/Authentication/DriverOTPVerification copy'
import Driver_home from './Components/Driver/Driver_Home/Driver_home'
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes'
import DriverSigninForm from './Components/Authentication/DriverSigninForm'
import DriverPrivateRoutes from './Components/PrivateRoutes/DriverPrivateRoutes'
import DriverSigninPrivateRoute from './Components/PrivateRoutes/DriverSigninPrivateRoute'
import TripRequestDetail from './Components/Common/TripRequestDetail'
import Profile from './Components/User/Profile/Profile'
import Car from './Components/User/Car/Car'
import Driver_Profile from './Components/Driver/Driver_Profile/Driver_Profile'
import RequestPool from './Components/Driver/Driver_Home/RequestPool/RequestPool'
import ConfirmedRequest from './Components/Driver/Driver_Home/Confirmed Request/ConfirmedRequest'
import RequestHistory from './Components/Driver/Driver_Home/History/RequestHistory'
import UserConfirmed from './Components/User/Confirmed/UserConfirmed'
import AdminSigninForm from './Components/Authentication/Admin/AdminSigninForm'
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard'
import UserList from './Components/Admin/UserList/Userlist.jsx'
import ProfileViewAdmin from './Components/Admin/ProfileView/ProfileViewAdmin'
import DriverList from './Components/Admin/DriverList/DriverList'
import Requests from './Components/Admin/Requests/Requests'
import Pending from './Components/User/pending/Pending'
import HistoryUser from './Components/User/History/HistoryUser'
import ChatUser from './Components/Chat/ChatUser'
import NotificationButton from './Components/Notification/NotificationButton'
import Banking from './Components/Admin/Banking/Banking'
import AdminSigninPrivateRoute from './Components/PrivateRoutes/AdminSignInPrivateRoutes'
import AdminPrivateRoutes from './Components/PrivateRoutes/AdminPrivateRoutes'
import CommonPrivateRoutes from './Components/PrivateRoutes/CommonPrivateRoutes'





function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  let isAuthenticated = localStorage.getItem("isAuthenticated");

  // Check if isAuthenticated is not present or is null, and set it to false
  if (isAuthenticated === null) {
    isAuthenticated = "false";
    localStorage.setItem("isAuthenticated", "false");
  }


  return (
    <>
    
    <Router>
      <Routes>
        <Route exact path="/trip_request_detail/:trip_request_id" element={<TripRequestDetail/>}/>
        
        
        
        
        {/* <Route path='/' element={<CommonPrivateRoutes/>}>
        </Route> */}

        

        <Route path='/' element={<PrivateRoutes/>}>
          <Route exact path="/user/otpverification" element={<OTPVerification/>}/>
          <Route exact path="/user/profile" element={<Profile/>}/>
          <Route exact path="/user/car" element={<Car/>}/>
           <Route exact path="/"  element={<UserHome/>}/>
           <Route exact path="/user/confirmed" element={<UserConfirmed/>}/>
           <Route exact path="/user/pending" element={<Pending/>}/>
           <Route exact path="/user/history" element={<HistoryUser/>}/>
        </Route>

        <Route path='/' element={<DriverPrivateRoutes/>}>
          <Route element={<Driver_home/>} exact path="/driver/home" />
          <Route element={<RequestPool/>} exact path="/driver/requestpool" />
          <Route element={<ConfirmedRequest/>} exact path="/driver/confirmedrequests" />
          <Route element={<RequestHistory/>} exact path="/driver/trip_history"/>
          <Route exact path="/driver/profile" element={<Driver_Profile/>}/>
        </Route>

        <Route path='/' element={<DriverSigninPrivateRoute/>}>
          <Route exact path="/driver/otpverification" element={<DriverOTPVerification/>}/>
          <Route exact path="/user/register" element={<UserSignupform/>}/>
          <Route exact path="/user/signin" element={<UserSigninForm/>}/>
          <Route exact path="/driver/register" element={<DriverSignupform/>}/>
          <Route element={<DriverSigninForm/>} exact path="/driver/signin"/>
        </Route>

        <Route path='/' element={<AdminSigninPrivateRoute/>}>
        <Route element={<AdminSigninForm/>} exact path="/admin/signin"/>
        </Route>

        <Route path='/' element={<AdminPrivateRoutes/>}>
        <Route element={<AdminDashboard/>} exact path="/admin/home"/>
        <Route element={<UserList/>} exact path="/admin/userlist"/>
        <Route exact path="/admin/userdetail/:user_id" element={<ProfileViewAdmin/>}/>
        <Route element={<DriverList/>} exact path="/admin/driverlist"/>
        <Route element={<Requests/>} exact path="/admin/Requests"/>
        <Route path='admin/Banking' element={<Banking/>}/>
        </Route>

        
        
        <Route path='/chat/' element={<ChatUser/>}/>
        <Route path='/notification/' element={<NotificationButton/>}/>
        
      </Routes>
    </Router>
    
    
    </>

  )
}

export default App

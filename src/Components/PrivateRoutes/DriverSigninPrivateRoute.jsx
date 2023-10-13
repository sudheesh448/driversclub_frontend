// DriverSigninPrivateRoute.jsx

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

const DriverSigninPrivateRoute = () => {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_driver } = userData;

  console.log("DriverSigninPrivateRoute:", isAuthenticated, is_driver);

  if (!isAuthenticated) {
    // If the user is authenticated but not a driver, you can proceed with rendering the route.
    return <Outlet />;
  } else {
    if (is_driver){
        return <Navigate to="/driver/home" />;
    }
    else if (!is_driver){
        return <Navigate to="/" />;
    }
  }
};
export default DriverSigninPrivateRoute;

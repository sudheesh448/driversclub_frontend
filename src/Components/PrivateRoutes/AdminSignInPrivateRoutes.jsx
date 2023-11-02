// DriverSigninPrivateRoute.jsx

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

const AdminSigninPrivateRoute = () => {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_super } = userData;



  if (!isAuthenticated) {
    // If the user is authenticated but not a driver, you can proceed with rendering the route.
    return <Outlet />;
  } else {
    if (is_super){
        return <Navigate to="/admin/home" />;
    }
    else if (!is_super){
        return <Navigate to="/" />;
    }
  }
};
export default AdminSigninPrivateRoute;

// DriverPrivateRoutes.js

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

const DriverPrivateRoutes = () => {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_driver } = userData;

  console.log("DriverPrivateRoutes:", isAuthenticated);

  if (isAuthenticated && is_driver) {
    return <Outlet />;
  } else {
    // If the user is not authenticated as a driver, you can redirect them to a driver sign-in page or another appropriate route.
    return <Navigate to="/driver/signin" />;
  }
};

export default DriverPrivateRoutes;

// DriverPrivateRoutes.js

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

const AdminPrivateRoutes = () => {
  const userData = useSelector(selectUserData);
  const { isAuthenticated, is_super } = userData;

  console.log("DriverPrivateRoutes:", isAuthenticated);

  if (isAuthenticated && is_super) {
    return <Outlet />;
  } else {
    // If the user is not authenticated as a driver, you can redirect them to a driver sign-in page or another appropriate route.
    return <Navigate to="/admin/signin" />;
  }
};

export default AdminPrivateRoutes;

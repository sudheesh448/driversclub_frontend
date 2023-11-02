import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

const CommonPrivateRoutes= () => {
    const userData = useSelector(selectUserData);
    const { accessToken,isAuthenticated,is_driver,is_super } = userData;
    
    
    if (isAuthenticated) {
      
      return <Outlet />;
    } else {
      // If the user is not authenticated, you can redirect them to the sign-in page.
      return <Navigate to="/google" />;
    }
    }

export default CommonPrivateRoutes
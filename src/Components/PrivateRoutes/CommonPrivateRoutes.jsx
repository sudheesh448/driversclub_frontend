// Import the necessary components

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

// Define your ProtectedRoute component
const CommonPrivateRoutes = () => {
    const userData = useSelector(selectUserData);
    const { accessToken,isAuthenticated,is_driver } = userData;
    
    
    if (isAuthenticated ) {
      
      return <Outlet />;
    } else {
      return <Navigate to="/user/signin" />;
    }
    }

export default CommonPrivateRoutes;

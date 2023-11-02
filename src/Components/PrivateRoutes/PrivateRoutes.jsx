// Import the necessary components

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/authSlice';

// Define your ProtectedRoute component
const PrivateRoutes = () => {
    const userData = useSelector(selectUserData);
    const { accessToken,isAuthenticated,is_driver,is_super } = userData;
    
    
    if (isAuthenticated && !is_driver && !is_super) {
      
      return <Outlet />;
    } else {
      // If the user is not authenticated, you can redirect them to the sign-in page.
      return <Navigate to="/user/signin" />;
    }
    }

export default PrivateRoutes;

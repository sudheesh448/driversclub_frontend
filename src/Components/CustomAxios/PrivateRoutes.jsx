// Import the necessary components

import { Outlet, Navigate } from 'react-router-dom';

// Define your ProtectedRoute component
const PrivateRoutes = ({children}) => {
    let isAuthenticated= localStorage.getItem("isAuthenticated")
    console.log("PrivateRoute:", isAuthenticated)
    return(
  
        isAuthenticated ? children : <Navigate to="/user/signin"/>
        
    )
    }

export default PrivateRoutes;

// authActions.js
import { accordionClasses } from '@mui/material';
import axiosInstance from './../CustomAxios/axiosInstance';
import Swal from 'sweetalert2';

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/token/', formData);
    
    // Handle the response here if needed
    console.log('Authentication successful:', response.data);
    
    console.log(response.data)

    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("is_super", response.data.admin);
    localStorage.setItem("is_driver", response.data.driver);
    localStorage.setItem("is_active", response.data.active);
    localStorage.setItem("first_name", response.data.first_name);
    localStorage.setItem("isAuthenticated", true);
    
    const userData = {
      username: localStorage.getItem('username'),
      id: localStorage.getItem('id'),
      is_super: localStorage.getItem('is_super') ,
      is_driver: localStorage.getItem('is_driver'),
      is_active: localStorage.getItem('is_active') ,
      first_name: localStorage.getItem('first_name'),
      email: localStorage.getItem('email'),
    };

    dispatch({ type: 'LOGIN_SUCCESS' , userData });
    return response;
  } catch (error) {
    // Handle authentication errors here
    console.error('Authentication failed redux:', error);
    Swal.fire({
      icon: 'error',
      title: 'Authentication Failed',
      text: 'Invalid username or password', // Customize the error message
    });
    // You can dispatch an action for authentication failure if needed

    dispatch({ type: 'LOGIN_FAILURE', error });
    throw error;
  }
};



export const logout = () => async (dispatch) => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
  try {
    // Send a backend request to log out the user (adjust the URL and method as needed)
    // const response = await axiosInstance.post('/logout/', {
    //   refresh_token: refreshToken,
    // });

    console.log("logout in redux works")

    // Clear user tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("is_super");
    localStorage.removeItem("is_driver");
    localStorage.removeItem("is_active");
    localStorage.removeItem("first_name");
    localStorage.setItem("isAuthenticated", false);
    
    // Dispatch the LOGOUT action to update the Redux state
    dispatch({ type: 'LOGOUT' });
    return { success: true, message: 'Logout successful' };
  } catch (error) {
    // Handle errors related to the logout process, such as network errors
    console.error('Logout failed redux:', error);
    // You can dispatch an action for logout failure if needed
    // dispatch({ type: 'LOGOUT_FAILURE', error });
    return { success: false, message: 'Logout failed' };
  }
}
};

export const checkAccessTokenValidity = () => (dispatch) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (accessToken && refreshToken) {
    // If both tokens exist, check the validity of the access token
    accordionClasses
    
      // If the access token is valid, no action is needed
      
      const userData = {
        username: localStorage.getItem('username'),
        id: localStorage.getItem('id'),
        is_super: localStorage.getItem('is_super') ,
        is_driver: localStorage.getItem('is_driver'),
        is_active: localStorage.getItem('is_active') ,
        first_name: localStorage.getItem('first_name'),
        email: localStorage.getItem('email'),
      };
      dispatch({ type: 'ACCESS_TOKEN_VALID',userData });
    
    
  } else {
    // If either token is missing, set isAuthenticated to false
    dispatch({ type: 'ACCESS_TOKEN_MISSING' });
  }
};

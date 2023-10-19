import axios from 'axios';
import { store } from "./../Redux/store"; // Import your Redux store and action
import { logout,login } from "./../Redux/authSlice"; // Import your logout action from Redux
import Swal from 'sweetalert2';


let isRefreshing = false;
let refreshQueue = [];


const AxiosInstance = () => {
  const accessToken = store.getState().auth.accessToken;
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Replace with your base URL
    timeout: 25000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  

  axiosInstance.interceptors.response.use(
    async (response) => {
      console.log("interceptor no error::",response)
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const originalConfig = error.config;

        console.log("intercepter error 401 inside")
        console.log("Access token expired")
        console.log(originalConfig)

        if (!isRefreshing) {
          isRefreshing = true;
          const refresh_token = store.getState().auth.refreshToken;

          try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/token/refresh/',
              {
                refresh: refresh_token,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );

            if (response.status === 200) {
              const newAccessToken = response.data['access'];
              const newRefreshToken = response.data['refresh'];
              const is_super = store.getState().auth.is_super;
              const is_driver = store.getState().auth.is_driver;
              const is_active = store.getState().auth.is_active;
              const first_name = store.getState().auth.first_name;
              const email = store.getState().auth.email;
              const username = store.getState().auth.username;
              const userId = store.getState().auth.userId;
              const name = store.getState().auth.name;

          console.log("New access token",newAccessToken);
          console.log("new refresh token",newRefreshToken);


            store.dispatch(
              login({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                is_super:is_super,
                is_driver: is_driver,
                is_active : is_active,
                first_name : first_name,
                email : email,
                username : username,
                userId  : userId ,
                name : name,
                isAuthenticated : true
              })
            );

              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;
              originalConfig.headers[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;


              if (refreshQueue.length > 0) {
                // Resend all the queued requests
                console.log("resendig the qued requests")
                console.log(refreshQueue)
                refreshQueue.forEach((requestCallback) => {
                  requestCallback();
                });
                // Clear the queue
                refreshQueue = [];
              }


              return axios(originalConfig);
            }
          } catch (refreshError) {
            console.log('Refresh Token expired:');
            console.log('Failed to refresh token:', refreshError);

            Swal.fire({
              icon: 'warning',
              title: 'Session Expired',
              text: 'Your session has expired. Please log in again.',
              confirmButtonText: 'OK',
            });

            store.dispatch(logout());
          } finally {
            isRefreshing = false;
          }
        } else {
          // If a refresh token request is already in progress, enqueue the original request
          return new Promise((resolve) => {
            refreshQueue.push(() => {
              originalConfig.headers['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
              console.log("queing up coming API requests")
              resolve(axios(originalConfig));
            });
          });
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default AxiosInstance;

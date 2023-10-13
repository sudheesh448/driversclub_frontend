import axios from "axios";
import AxiosInstance from "./../Components/CustomAxios/axiosInstance";
import { store } from "./../Components/Redux/store"; // Import your Redux store and action
import { logout } from "./../Components/Redux/authSlice"; // Import your logout action from Redux

let refresh = false;
console.log("intercepter")



AxiosInstance().interceptors.response.use( 
  (response) =>  { 
    console.log("No error");
    return response},
  
  async (error) => {
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      
      const refresh_token = store.getState().auth.refreshToken;
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refresh_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {

          
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      }
  
      catch (refreshError) {
        console.log("its here" + refreshError);
        console.log("intercepter log out")
        store.dispatch(logout());
      } finally {
        refresh = false;
      }
    }
    return Promise.reject(error);
  }
);

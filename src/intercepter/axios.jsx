import axiosInstance from './../Components/CustomAxios/axiosInstance'
import store from "./../Components/Redux/store"
import axios from "axios";


let refresh = false;
console.log("intercepter")

axiosInstance.interceptors.response.use(
   
  (resp) => resp,
  async (error) => {
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      console.log("intercepter inside")
      console.log("refresh:",localStorage.getItem("refresh_token"));
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          console.log("new:",response.data.refresh);
          localStorage.setItem("refresh_token", response.data.refresh);
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
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

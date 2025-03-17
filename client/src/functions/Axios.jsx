import axios from 'axios'
import { jwtDecode } from "jwt-decode";
export const axiosJWT = axios.create({
    baseURL:"http://localhost:5000"
  })
export function Axios() {

}

export const PostRequest = async (url,data) => {
    const defaultURL = "http://localhost:5000";
    let result;
    try {
        const res = await axios.post(defaultURL+url, data);
        result = res.data;
      } catch (err) {
        result = err;
    //   console.log(err);
      }
    return result
}

export const PostRequestWithHeader = async (url,data) => {
    let result;

    try {
        const res = await axiosJWT.delete(url, data);
        result = res.data;
      } catch (err) {
        result = err;
       console.log(err);
      }
    return result
}




 export const refreshTokens = async (refreshToken) => {
    try {
      const res = await axios.post("http://localhost:5000/refresh", { token: refreshToken });
      console.log('refresh token');
    //  console.log(res.data);
    //   await setUserData({
    //     ...UserData,
    //     accessToken: res.data.accessToken,
    //     refreshToken: res.data.refreshToken,
    //   });
    //  console.log(res.data);
    
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  
        // axiosJWT.interceptors.request.use(
        //     async (config) => {
        //     let currentDate = new Date();
        //     const accessToken = localStorage.getItem('accessToken');
        //     const refreshToken = localStorage.getItem('refreshToken');
        //   //  console.log(UserData.accessToken);
        //     const decodedToken = jwtDecode(accessToken);
        //   //  console.log(decodedToken);
        //     if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //         const data = await refreshTokens(refreshToken);
        //         localStorage.setItem('refreshToken',data.refreshToken);
        //         localStorage.setItem('accessToken',data.accessToken);
        //         //       await setUserData({
        //         //     ...UserData,
        //         //     accessToken:data.accessToken,
        //         //     refreshToken:data.refreshToken,
        //         // });
        //       //  console.log(data);
        //         config.headers["authorization"] = "Bearer " + data.accessToken;
        //     }
        //     return config;
        //     },
        //     (error) => {
        //     return Promise.reject(error);
        //     }
        // );

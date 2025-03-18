import axios from 'axios';
import { axiosInstance, refreshTokens } from '../functions/Axios';
import React, { createContext, useState } from 'react'
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

export default function UserContextProvider ({children}){
  const [UserData, setUserData] = useState({'email':'email@email.com'});



  axiosInstance.interceptors.request.use(
    async (config) => {
    let currentDate = new Date();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
   
    const decodedToken = jwtDecode(accessToken);
  //  console.log(decodedToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshTokens(refreshToken);
        localStorage.setItem('refreshToken',data.refreshToken);
        localStorage.setItem('accessToken',data.accessToken);
        localStorage.setItem('isValid', data.isValid);
       await setUserData({
            ...UserData,
            isValid:data.isValid,
            email:'newEmail@email.com',
            accessToken:data.accessToken,
            refreshToken:data.refreshToken,
        });
    //   console.log(data);
        config.headers["authorization"] = "Bearer " + data.accessToken;
    }
    return config;
    },
    (error) => {
    return Promise.reject(error);
    }
);



    return (
        <UserContext.Provider value={{UserData, setUserData}}>
            {children}
        </UserContext.Provider>
    )



    


}


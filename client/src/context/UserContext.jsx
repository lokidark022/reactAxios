import axios from 'axios';
import { axiosJWT } from '../functions/Axios';
import React, { createContext, useState } from 'react'
import { refreshTokens } from '../functions/Axios';
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

export default function UserContextProvider ({children}){
  const [UserData, setUserData] = useState({'email':'email@email.com'});



  axiosJWT.interceptors.request.use(
    async (config) => {
    let currentDate = new Date();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  //  console.log(UserData.accessToken);
    const decodedToken = jwtDecode(accessToken);
  //  console.log(decodedToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshTokens(refreshToken);
        localStorage.setItem('refreshToken',data.refreshToken);
        localStorage.setItem('accessToken',data.accessToken);
       await setUserData({
            ...UserData,
            email:'newEmail@email.com',
            accessToken:data.accessToken,
            refreshToken:data.refreshToken,
        });
       console.log(data);
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


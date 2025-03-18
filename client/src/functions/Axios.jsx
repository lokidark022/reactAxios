import axios from 'axios'
import { jwtDecode } from "jwt-decode";
export const axiosInstance = axios.create({
    baseURL:"http://localhost:5000"

  })

  export const axiosPostMethod = axios.create({
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

function validateResult (result) {
 
  if(result.status === 200){
   // console.log('all goods');
    return true;
  }else if(result.status === 403 || result.status === 401){
    localStorage.clear();
    console.log('redirect to invalid page and clearing data');
    window.location.href = '/invalid';
    return false;
  }

}

export const PostRequestWithHeader = async (url,method,data,refreshToken) => {
  axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + data;
    let result;
    
    if(method == 'delete'){
      try {
        const res = await axiosInstance.delete(url);
        if(validateResult(res) === true){
          result = res.data;
        }
      
      } catch (err) {
        validateResult(err)
        result = err;
       //console.log(err);
      }

    }else if(method == 'post'){
      try {
        const res = await axiosInstance.post(url,{token:refreshToken});
        if(validateResult(res) === true){
          result = res.data;
        }
      } catch (err) {
        result = err;
      // console.log(err);
      }

    }
    return result
}




 export const refreshTokens = async (refreshToken) => {
    try {
      const res = await axios.post("http://localhost:5000/refresh", { token: refreshToken });
      console.log('refresh token');
      if(validateResult(res) === true){
        return res.data;
      }
     
    } catch (err) {
        validateResult(err);
      //console.log(err.status);
    }
  };

  



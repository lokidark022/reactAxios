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

// export const PostLagout  = async (url,refreshToken) =>{
//   let result;
//   try {
//     const res = await axios.post("http://localhost:5000" + url, {
//        headers: { authorization: "Bearer " + refreshToken },
//      });
//      result = res.data;
    
//    } catch (err) {

//    }
//   return result
// }



export const PostRequestWithHeader = async (url,method,data) => {
    let result;
    if(method == 'delete'){
      try {
        const res = await axiosJWT.delete(url, data);
        result = res.data;
      } catch (err) {
        result = err;
       console.log(err);
      }

    }else if(method == 'post'){
      try {
        const res = await axiosJWT.post(url, {
          headers: { authorization: "Bearer " + data },
        });
        result = res;
      } catch (err) {
        result = err;
       console.log(err);
      }

    }
    return result
}




 export const refreshTokens = async (refreshToken) => {
    try {
      const res = await axios.post("http://localhost:5000/refresh", { token: refreshToken });
      console.log('refresh token');
    
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  



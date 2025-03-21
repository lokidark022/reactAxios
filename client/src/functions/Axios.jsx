import axios from 'axios'

export const axiosInstance = axios.create({
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
  }else if(result.status === 403 || result.status === 401 || result.status === 500){
   localStorage.clear();
    console.log('redirect to invalid page and clearing data');
   window.location.href = '/invalid';
    return false;
  }

}

export const PostRequestWithHeader = async (url,method,func) => {
  const accessToken = await localStorage.getItem('accessToken');
  const refreshToken = await localStorage.getItem('refreshToken');




   axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
    let result;
    
    if(method == 'delete' && func == 'delete'){
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

    }else if(method == 'post' && func == 'logout'){
      try {
        const res = await axiosInstance.post(url,{token:refreshToken});
        if(validateResult(res) === true){
          localStorage.clear();
          console.log('redirect to invalid page and clearing data');
           window.location.href = '/invalid';
          result = res.data;
        }
      } catch (err) {
        result = err;
      // console.log(err);
      }

    }
    else if(method == 'get' && func == 'userdata'){
      try {
        const res = await axiosInstance.get(url);
  
          result = res.data;
     
      } catch (err) {
        result = err;
      // console.log(err);
      }

    }
    return result  
}
 export const refreshTokens = async () => {
    try {
      const refreshToken = await localStorage.getItem('refreshToken');
      const res = await axios.post("http://localhost:5000/refresh", { token: refreshToken });
      console.log('refresh token');
      if(validateResult(res) === true){
        return res.data;
     }
    } catch (err) {
        validateResult(err);
    }
  };

  



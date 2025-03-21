import { Navigate, Outlet } from "react-router-dom";
import { PostRequestWithHeader } from "./Axios";
import { useEffect,useContext, useState } from "react";
import { UserContext, UserInfoContext } from "../context/UserContext";

const ProtectedRoutes =  () => {
const {UserInfo,setUserInfo} = useContext(UserInfoContext);
const {UserData, setUserData} = useContext(UserContext);
  useEffect(() => {

    if(UserInfo === true){
      console.log('fetching data onload');
          try {   
       async function fetchData (){
        const result = await PostRequestWithHeader('/userinfo','get','userdata');
        setUserData(result);
        //console.log(result);
        if(result.isValid === true && result !== undefined){
         // console.log('outlete true')
          return <Outlet /> ;
        }else{
       //   console.log('outlete false')
          console.log('redirect to invalid page and clearing data');
           window.location.href = '/invalid';
        }
        //return result.isValid ? <Outlet /> : <Navigate to="/invalid" />;

  
        }
        
        fetchData();
 
        
    } catch (error) {
   
    }
    }

  },[UserInfo])
//  console.log('outlete')
  return <Outlet/>

  // const isAuth = true;
  // return isAuth ? <Outlet /> : <Navigate to="/invalid" />;

};
export default ProtectedRoutes;

// const authValids = async () => {
//     const accessToken = await localStorage.getItem('accessToken');
//   //  console.log(accessToken);
//    const result = await PostRequestWithHeader('/authvalid','post',{
//         headers: { authorization: "Bearer " + accessToken }});
//     console.log(result);
//       return result
// }
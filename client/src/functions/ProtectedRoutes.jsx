import { Navigate, Outlet } from "react-router-dom";
import { PostRequestWithHeader } from "./Axios";
import { useEffect } from "react";


const ProtectedRoutes =  () => {
    // try {   
    //     const accessToken =  localStorage.getItem('accessToken');
    //     const result =  PostRequestWithHeader('/authvalid','post',accessToken);
    //     console.log(result);
        
    // } catch (error) {
        
    // }
   
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to="/invalid" />;
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
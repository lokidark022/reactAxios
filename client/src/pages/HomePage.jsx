import React, { useContext,useEffect } from 'react'
import { Card,Button } from 'react-bootstrap';
import { UserContext ,UserInfoContext} from '../context/UserContext';
import { PostRequestWithHeader} from '../functions/Axios';
import axios from 'axios';

export default function HomePage() {
    const {UserData, setUserData} = useContext(UserContext);
    const {UserInfo,setUserInfo} = useContext(UserInfoContext);
    useEffect(() => {
      
      setUserInfo(true);
    }, []);
 
    const handleDelete = async () => {
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/users/1','delete','delete');
         console.log(result);

    }
    const handleLogout = async () => {
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/logout','post','logout');
          //console.log(result);
    };

  return (  
    <div>
        <Card>
            <h2>Welcome {UserData.email} </h2>
            <Button variant="primary" onClick={() => handleDelete()}>
                delete
            </Button>
            <Button variant="danger" onClick={() => handleLogout()}>
                logout
            </Button>
        </Card>

    </div>
  )
}

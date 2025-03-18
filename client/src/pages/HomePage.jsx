import React, { useContext } from 'react'
import { Card,Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { PostRequestWithHeader} from '../functions/Axios';
import axios from 'axios';

export default function HomePage() {
    const {UserData, setUserData} = useContext(UserContext);

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('accessToken');
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/users/1','delete',accessToken,'');
         console.log(result);

    }
    const handleLogout = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/logout','post',accessToken,refreshToken);
          console.log(result);
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

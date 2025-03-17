import React, { useContext } from 'react'
import { Card,Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { PostRequestWithHeader } from '../functions/Axios';
export default function HomePage() {
    const {UserData, setUserData} = useContext(UserContext);

    const handleDelete = async () => {
        const accessToken = localStorage.getItem('accessToken');
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/users/1',{
            headers: { authorization: "Bearer " + accessToken },
          });

          console.log(result);

    }

  return (
    <div>
        <Card>
            <h2>Welcome {UserData.email} </h2>
            <Button variant="primary" onClick={() => handleDelete()}>
                delete
            </Button>
            <Button variant="danger" onClick={() => console.log("logout")}>
                logout
            </Button>
        </Card>

    </div>
  )
}

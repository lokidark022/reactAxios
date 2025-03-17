import React, { use, useContext, useEffect, useState } from 'react'
import { Form ,Card, Button} from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { PostRequest } from '../functions/Axios';

export default function LoginPage() {


  const navigate = useNavigate();

  const {UserData, setUserData} = useContext(UserContext);
  const [email,setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async  () =>{
  const data = await PostRequest('/api/login',{email,password})
  if(data.isValid === true){
   await setUserData(data);
    localStorage.setItem('refreshToken',data.refreshToken);
    localStorage.setItem('accessToken',data.accessToken);
   console.log('saved state navigating to home');
    navigate('/home');
    
  }else{
    alert('Invalid');
  }




  }

  return (
    <div>
      <Card>
        <h4>Login</h4>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
        <Button  variant="outline-danger" onClick={() => handleLogin()}>
          Login
        </Button>
      </Card>


    </div>
  )
}

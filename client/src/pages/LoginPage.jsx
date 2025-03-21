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
    localStorage.setItem('isValid',data.isValid);
    await setUserData({
      ...UserData,
      isValid:data.isValid,
      email:email,
      accessToken:data.accessToken,
      refreshToken:data.refreshToken,
  });


   console.log('saved state navigating to home');
    navigate('/home');
    
  }else{
    alert('Invalid');
  }




  }

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card style={{maxHeight:"400px",maxWidth:"500px"}}>
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

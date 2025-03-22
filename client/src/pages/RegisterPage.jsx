import React, { use, useContext, useEffect, useState } from 'react'
import { Form ,Card, Button} from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { PostRequest } from '../functions/Axios';
import { Container } from 'react-bootstrap';
import '../pages/css/style.css'
export default function RegisterPage() {


  const navigate = useNavigate();

  const {UserData, setUserData} = useContext(UserContext);
  const [email,setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setcPassword] = useState();
  const handleLogin = async  () =>{

    if(email && password && cpassword ){
        if(password == cpassword){
            const data = await PostRequest('/api/register',{email,password});
            if(data.isValid === true){
                alert(data.tmessage);
            }else{
                alert(data.tmessage);
            }
          
        }else{
            alert('password not matched.');
        }
     
    }else{
        alert('Empty inputs');
    }
    




  }

  return (
    <div >
      <Container>
        <div className='loginpage-body'>
        <Card className='loginpage-card'>
          <h4>Register</h4>
          <Form.Control onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
          <Form.Control onChange={(e) => setPassword(e.target.value)} required type="password" placeholder="Enter password" />
          <Form.Control onChange={(e) => setcPassword(e.target.value)} required type="password" placeholder="Confirm password" />
          <Button  variant="outline-primary" onClick={() => handleLogin()}>
            Register
          </Button>    <a href="/login">Login</a>
        </Card>
        </div>
      </Container>



    </div>
  )
}

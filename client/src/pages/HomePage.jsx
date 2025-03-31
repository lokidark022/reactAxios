import React, { useContext,useEffect, useState } from 'react'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5001');

import { Card,Button, Container,Form } from 'react-bootstrap';
import { UserContext ,UserInfoContext} from '../context/UserContext';
import { PostRequestWithHeader} from '../functions/Axios';
import Header from './layout/Header';
import '../pages/css/style.css'
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import { GlobalMessageContext } from '../context/UserContext';



export default function HomePage() {

    const {UserData, setUserData} = useContext(UserContext);
    const {UserInfo,setUserInfo} = useContext(UserInfoContext);
    const [toggleSides , setToggleSides] = useState(true);
    const [myConvo,setMyConvo] = useState(null);
    const [currentChat, setCurrentChat] = useState(localStorage.getItem('CurrentChat') ? localStorage.getItem('CurrentChat') : 'Global');
    const [messages, setMessages] = useState([]);
    const [currentMessages,setCurrentMessages] = useState([]);
    const {GlobalMessages, setGlobalMessages} = useContext(GlobalMessageContext);
    useEffect(() => {
      
      setUserInfo(true);
    }, []);
 
    const handleDelete = async () => {
      //  console.log(accessToken);
       const result = await PostRequestWithHeader('/users/1','delete','delete');
         console.log(result);

    }
    // const handleLogout = async () => {
    //   //  console.log(accessToken);
    //    const result = await PostRequestWithHeader('/logout','post','logout');
    //       //console.log(result);
    // };
  const toggleSide = () => {
    let sideCol = document.getElementById('side-col');
    let contentCol = document.getElementById('content-col');
    if(toggleSides){
      
    console.log('show');
      sideCol.className = "col-12 ";
      contentCol.className = "d-none";
    }else{
      
      sideCol.className = "col-lg-3 col-sm-2 d-none d-lg-block";
      contentCol.className = "col-lg-9 col-sm-10 col-xs-12";
    console.log('hide');

    }
  }

    useEffect(() => {
      socket.on('myConvoResponse',(data) => setMyConvo(data));

    }, [socket]);

    useEffect(() =>{
      
      if(GlobalMessages !== undefined && currentChat == 'Global'){
        setMessages(GlobalMessages);
     
      }else{

        setMessages(currentMessages);
       // console.log(currentMessages);
      }
   //   setCurrentChat(localStorage.getItem('CurrentChat'));
    },[currentChat])
    useEffect(() => {
      //console.log('change message');
      setMessages(currentMessages);
    }, [currentMessages]);

  return (  
    <div >
       
        <Container fluid>
        <Header/>
          <div className='container-sm border'>
            <div className="row">
              <div className="d-lg-none d-sm-block">
              <button onClick={() => toggleSide(toggleSides ? setToggleSides(false) : setToggleSides(true))}>show {toggleSides ? ' Contacts' : 'Messages'}</button>
              </div>
            </div>
            
            <div className="row">

              <div id='side-col' className="col-lg-3 col-sm-0 d-none d-lg-block ">
                <Contacts CurrentMessages={{currentMessages,setCurrentMessages}} Messages={{messages, setMessages}} MyConvo={{myConvo,setMyConvo}} CurrentChat={{currentChat, setCurrentChat}}></Contacts>
                
              </div>
              <div id='content-col' className="col-lg-9 col-sm-12 col-xs-12"><Messages Messages={{messages, setMessages}} CurrentChat={{currentChat, setCurrentChat}} socket={socket} MyConvo={{myConvo,setMyConvo}}></Messages> </div>
            </div>
          

          </div>
          
        </Container>
 

    </div>
  )
}

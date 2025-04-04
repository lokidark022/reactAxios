import React, { useContext,useEffect, useState } from 'react'


import { Card,Button, Container,Form } from 'react-bootstrap';
import { UserContext ,UserInfoContext} from '../context/UserContext';
import { PostRequestWithHeader} from '../functions/Axios';
import Header from './layout/Header';
import '../pages/css/style.css'
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import { joinRoom, socket } from './module/socket';
export default function HomePage() {
    const {UserData, setUserData} = useContext(UserContext);
    const {UserInfo,setUserInfo} = useContext(UserInfoContext);
    const [toggleSides , setToggleSides] = useState(true);
    const [myConvo, setMyConvo] = useState([]);
    const [selectedContact, setSelectedContact] = useState('');
    const [roomId,setRoomId] = useState('');
    const [newMsg, setNewMsg] = useState();
    let MultiRoom = [];
    useEffect(() => {
      socket.on('myConvoResponse',(data) => {
    
        setMyConvo(data);
      })
    }, [socket]);
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
      
    setUserInfo(true);
  
  }, []);
  useEffect(() =>{
   // console.log(selectedContact)
  },[selectedContact])
  useEffect(() => {
    //console.log(roomId)
  }, [roomId]);



  useEffect(() => {
    if(myConvo.length != 0){
      for (let index = 0; index < myConvo.length; index++) {
        MultiRoom.push(myConvo[index].roomId);
      }
      joinRoom({MyRoom:MultiRoom,email:UserData.email});
    }
  }, [myConvo]);

    useEffect(() => {
 
        let tempMsg = myConvo
        tempMsg.findIndex(x => {
        if(x.roomId == newMsg.roomId){
          x.messages = newMsg.newMsg;
        }
      })

        console.log(tempMsg)
      setMyConvo(tempMsg);
  }, [newMsg]);

  useEffect(() => {
 


    socket.on('privateMessageResponse',(data) =>  {
      setNewMsg(data);
    });
  }, [socket,myConvo]);
  
  



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
                <Contacts  RoomId={{roomId,setRoomId}} SelectedContact={{selectedContact, setSelectedContact}} MyConvo={{myConvo, setMyConvo}}></Contacts>
                
              </div>
              <div id='content-col' className="col-lg-9 col-sm-12 col-xs-12"><Messages  RoomId={{roomId,setRoomId}} SelectedContact={{selectedContact, setSelectedContact}} MyConvo={{myConvo, setMyConvo}}></Messages> </div>
            </div>
          

          </div>
          
        </Container>
 

    </div>
  )
}

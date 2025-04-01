import React, { useEffect, useRef, useState,useContext } from 'react'
import MessageFooter from './MessageFooter'
import MessageBody from './MessageBody'
import MessageHeader from './MessageHeader'
import { UserContext } from '../../context/UserContext'
function Messages({CurrentRoomId,Messages,socket,MyConvo,CurrentChat}) {
  const {UserData, setUserData} = useContext(UserContext);
  const [HeaderData, setHeaderData] = useState();
  const [typingStatus, setTypingStatus] = useState('');
  // const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [clearTypingStatus, setClearTypingStatus] = useState(false);



  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [Messages.messages]);

  function TypingStatus (data) {
    setClearTypingStatus(false);
    setTypingStatus(data);
    //console.log(clearTypingStatus);
  }
  function ClearTypingStatus (data){
    setClearTypingStatus(data);
    //console.log(clearTypingStatus);
  }
  useEffect(() => {
    
 //  socket.on('myConvoResponse',(data) => MyConvo.setMyConvo(data));
    socket.on('typingResponse',(data) => TypingStatus(data));
    socket.on('notTypingResponse', () =>  ClearTypingStatus(true));
    socket.on('privateMessageResponse',(data) => Messages.setMessages(data));
  }, [socket]);

  
  useEffect(() => {
    console.log('current chat change and join room');
      // if(UserData.email !== 'email@email.com'){
         socket.emit('join_room',{roomId:CurrentRoomId.currentRoomId,email:UserData.email});
      //   console.log(UserData.email);
      // }
      //console.log(CurrentRoomId.currentRoomId);
  },[CurrentChat.currentChat,CurrentRoomId.currentRoomId])

  return (

    <div> 
    

               <MessageHeader headerData={{HeaderData, setHeaderData}} CurrentChat={CurrentChat}></MessageHeader>
               <MessageBody socket={socket}
                  headerData={{HeaderData, setHeaderData}}
                  messages={{Messages}}
                  lastMessageRef={lastMessageRef}
                  TypingStatus={{typingStatus, setTypingStatus}}
                  userData={{UserData, setUserData}}
                  ClearTypingStatus={{clearTypingStatus, setClearTypingStatus}}
                  MyConvo={MyConvo}>
               </MessageBody>
               <MessageFooter CurrentRoomId={CurrentRoomId}  socket={socket} userData={UserData}></MessageFooter>
    </div>
  )
}

export default Messages
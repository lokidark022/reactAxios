import React, { useEffect, useRef, useState,useContext } from 'react'
import MessageFooter from './MessageFooter'
import MessageBody from './MessageBody'
import MessageHeader from './MessageHeader'
import { UserContext } from '../../context/UserContext'
function Messages({socket}) {
  const {UserData, setUserData} = useContext(UserContext);
  const [HeaderData, setHeaderData] = useState();
  const [typingStatus, setTypingStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const [clearTypingStatus, setClearTypingStatus] = useState(false);
  const [myConvo,setMyConvo] = useState(null);


  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);

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
    
    socket.on('myConvoResponse',(data) => setMyConvo(data));
    socket.on('typingResponse',(data) => TypingStatus(data));
    socket.on('notTypingResponse', () =>  ClearTypingStatus(true));
  }, [socket]);
  // useEffect(() =>{
  //   typingStatusDisplay();
  // },[typingStatus])

  //console.log(clearTypingStatus);

  return (

    <div> 
    

               <MessageHeader headerData={{HeaderData, setHeaderData}}></MessageHeader>
               <MessageBody socket={socket}
                  headerData={{HeaderData, setHeaderData}}
                  messages={{messages, setMessages}}
                  lastMessageRef={lastMessageRef}
                  TypingStatus={{typingStatus, setTypingStatus}}
                  userData={{UserData, setUserData}}
                  ClearTypingStatus={{clearTypingStatus, setClearTypingStatus}}
                  MyConvo={{myConvo,setMyConvo}}>
               </MessageBody>
               <MessageFooter socket={socket} userData={UserData}></MessageFooter>
    </div>
  )
}

export default Messages
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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);
  return (

    <div>
               <MessageHeader headerData={{HeaderData, setHeaderData}}></MessageHeader>
               <MessageBody socket={socket}
                  headerData={{HeaderData, setHeaderData}}
                  messages={{messages, setMessages}}
                  lastMessageRef={lastMessageRef}
                  typingStatus={typingStatus}
                  userData={{UserData, setUserData}}>
               </MessageBody>
               <MessageFooter socket={socket} userData={UserData}></MessageFooter>
    </div>
  )
}

export default Messages
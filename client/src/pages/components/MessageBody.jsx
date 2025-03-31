import React, { useState ,useEffect,useContext} from 'react';
import { GlobalMessageContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';



const MessageBody = ({socket,headerData,messages,lastMessageRef,TypingStatus,userData,ClearTypingStatus,MyConvo}) => {
     //   console.log(messages.Messages);
    
    
    const {GlobalMessages, setGlobalMessages} = useContext(GlobalMessageContext);
    const [GlobalUsers, setGlobalUsers] = useState([]);


    useEffect(() => {
      
      socket.on('messageResponse', (data) => messages.Messages.setMessages(data));
      console.log('clear typing status');
      TypingStatus.setTypingStatus(null);
      var objDiv = document.getElementById("message-body");
        objDiv.scrollTop = objDiv.scrollHeight;
       
    }, [socket, messages.Messages.messages]);
    useEffect(() =>{
      //  console.log(GlobalMessages);
        if(GlobalMessages !== undefined ){
         //   console.log(GlobalMessages[0].text);
         const userEmail = userData.UserData.email;
         if(userData.UserData.email != 'email@email.com'){
            socket.emit('newUser', { email:userData.UserData.email, socketID: socket.id });
         }
        
         socket.emit('myConvo', {userEmail});
         messages.Messages.setMessages(GlobalMessages);
          }
        
    },[GlobalMessages])

    
  useEffect(() => {
    socket.on('newUserResponse', (data) => 
        setGlobalUsers(data)

);
   // console.log(GlobalUsers.length);
  }, [socket, GlobalUsers]);

  useEffect(() => {
 //   console.log(GlobalUsers);
    headerData.setHeaderData(GlobalUsers);
  },[GlobalUsers])


  //console.log(messages.Messages.messages);
    return (
    <>
     
            <Row  >
                <ul   id='message-body' className='message-body'>
                    


                   { messages.Messages.messages.map((message) => message.sender === userData.UserData.email?(
                        
                        <li key={message.id} className=' chat-you'>
                            <h6>You</h6>
                        <p>{message.message}</p>

                        </li>
                
                    ) : (

                        <li key={message.id} className=' chat-other'>
                            <h6>{message.sender}</h6>
                        <p>{message.message}</p>

                        </li>

                    ) )}  
                </ul>

        </Row>
        <div ref={lastMessageRef}>
        <div id='typingStatus' className="message__status ">
        <p>{ClearTypingStatus.clearTypingStatus ? '' : TypingStatus.typingStatus}</p>
        </div>

        </div>
    
    </>

    );
}

export default MessageBody;

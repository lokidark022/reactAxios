import React, { useState ,useEffect,useContext} from 'react';
import { GlobalMessageContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';



const MessageBody = ({socket,headerData,messages,lastMessageRef,typingStatus,userData}) => {
    
    
  
    const {GlobalMessages, setGlobalMessages} = useContext(GlobalMessageContext);
    const [GlobalUsers, setGlobalUsers] = useState([]);
    useEffect(() => {
      
      socket.on('messageResponse', (data) => messages.setMessages(data));
      //console.log(messages);
      var objDiv = document.getElementById("message-body");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [socket, messages.messages]);
    useEffect(() =>{
        if(GlobalMessages !== undefined ){
         //   console.log(GlobalMessages[0].text);

         socket.emit('newUser', { email:userData.UserData.email, socketID: socket.id });
        
            messages.setMessages(GlobalMessages);
          }
        
    },[GlobalMessages])

    
  useEffect(() => {
    socket.on('newUserResponse', (data) => 
        setGlobalUsers(data)

);
   // console.log(GlobalUsers.length);
  }, [socket, GlobalUsers]);

  useEffect(() => {
    headerData.setHeaderData(GlobalUsers);
  },[GlobalUsers])

    return (
    <>
     
            <Row  >
                <ul   id='message-body' className='message-body'>
                   {messages.messages.map((message) => message.name === userData.UserData.email?(
                        
                        <li key={message.id} className=' chat-you'>
                            <h6>You</h6>
                        <p>{message.text}</p>

                        </li>
                
                    ) : (

                        <li key={message.id} className=' chat-other'>
                            <h6>{message.name}</h6>
                        <p>{message.text}</p>

                        </li>

                    ) )}  
                </ul>

        </Row>
        <div ref={lastMessageRef}>
        <div className="message__status">
        <p>{typingStatus}</p>
        </div>

        </div>
    
    </>

        
        // <div className='message-body'>
        //   Global Chat
     
        //     {messages.map((message) => message.name === UserData.email?(

        //         <Row>
                 
        //             <Col className='m-1 chat-you '>
        //             <h6>You</h6>
        //              <p>{message.text}</p>
        //             </Col>
        //         </Row>
         
        //     ) : (

        //     <Row>
        //         <Col className='m-1 chat-other'> 
        //         <h6>{message.name}</h6>
        //              <p>{message.text}</p>
        
        //         </Col>
        //     </Row>
      
        //     ) )}  
           
        // </div>
    );
}

export default MessageBody;

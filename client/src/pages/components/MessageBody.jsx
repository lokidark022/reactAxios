import React, { useState ,useEffect,useContext} from 'react';
import { UserContext,GlobalMessageContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';



const MessageBody = ({socket}) => {

    const [messages, setMessages] = useState([]);
    const {UserData, setUserData} = useContext(UserContext);
    const {GlobalMessages, setGlobalMessages} = useContext(GlobalMessageContext);

    useEffect(() => {
      
      socket.on('messageResponse', (data) => setMessages(data));
      //console.log(messages);
      var objDiv = document.getElementById("message-body");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [socket, messages]);
    useEffect(() =>{
        if(GlobalMessages !== undefined ){
         //   console.log(GlobalMessages[0].text);
            setMessages(GlobalMessages);
          }
        
    },[GlobalMessages])
    
    return (
    <>
     
            <Row  >
                <ul   id='message-body' className='message-body'>
                Global Chat
                   {messages.map((message) => message.name === UserData.email?(
                        
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

import React, { useState ,useEffect,useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';



const MessageBody = ({socket}) => {

    const [messages, setMessages] = useState([]);
    const {UserData, setUserData} = useContext(UserContext);


    useEffect(() => {
      
      socket.on('messageResponse', (data) => setMessages(data));
      console.log(messages);
      var objDiv = document.getElementById("message-body");
        objDiv.scrollTop = objDiv.scrollHeight;

    }, [socket, messages]);

    
    return (
    <>
     
            <Row  >
                <ul id='message-body' className='message-body'>
                Global Chat
                   {messages.map((message) => message.name === UserData.email?(
                        
                        <li className=' chat-you'>
                            <h6>You</h6>
                        <p>{message.text}</p>

                        </li>
                
                    ) : (

                        <li className=' chat-other'>
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

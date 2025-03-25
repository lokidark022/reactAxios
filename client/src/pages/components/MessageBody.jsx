import React, { useState ,useEffect,useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';
const MessageBody = ({socket}) => {
    const [messages, setMessages] = useState([]);
    const {UserData, setUserData} = useContext(UserContext);
    useEffect(() => {
      socket.on('messageResponse', (data) => setMessages([...messages, data]));
      console.log(messages);
    }, [socket, messages]);
  
    return (
        <div className='message-body'>
            MessageBody
            {messages.map((message) => message.name === UserData.email?(

                <Row>
                    <Col className='m-1 chat-you '>
                     <p>{message.text}</p>
                    </Col>
                </Row>
         
            ) : (

            <Row>
                <Col className='m-1 chat-other'> 
                     <p>{message.text}</p>
        
                </Col>
            </Row>
      
            ) )}  
           
        </div>
    );
}

export default MessageBody;

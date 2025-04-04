import React, { useState ,useEffect,useContext, useRef} from 'react';
import { GlobalMessageContext, UserContext } from '../../context/UserContext';
import '../css/message_style.css'
import { Card,Row,Col } from 'react-bootstrap';
import { socket } from '../module/socket';




// const ScrollToBottom = () => {
//     const elementRef = useRef();
//     useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth"}));
//     return <div ref={elementRef} />;
// };
const MessageBody = ({RoomId,MyConvo}) => {
    const {UserData,setUserData} = useContext(UserContext);
   let currentMsg = [];
    MyConvo.myConvo.find(room => {
        if(room.roomId == RoomId.roomId){
            currentMsg = room.messages;
        }
    })

    console.log(MyConvo.myConvo);




   // console.log(currentMsg);
    return (
    <>
     
            <Row  >
                <ul   id='message-body' className='message-body'>
                    
                    {currentMsg.map(messages => messages.sender === UserData.email ? (
                        <li key={messages.id} className=' chat-you'>
                            <h6>You</h6>
                        <p>{messages.message}</p>

                        </li> 
                    ):(
                        <li key={messages.id} className=' chat-other'>
                            <h6>{messages.sender}</h6>
                        <p>{messages.message}</p>

                        </li>
                    ))}
            
                     {/* <ScrollToBottom /> */}
                </ul>

        </Row>
        {/* <div ref={lastMessageRef}>
        <div id='typingStatus' className="message__status ">
        <p>{ClearTypingStatus.clearTypingStatus ? '' : TypingStatus.typingStatus}</p>
        </div>

        </div> */}
    
    </>

    );
}

export default MessageBody;

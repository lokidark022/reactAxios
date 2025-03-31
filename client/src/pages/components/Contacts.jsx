import React, { useContext } from 'react'
import Contact from './Contact'
import '../css/style.css'
import GlobalContact from './GlobalContact'
import { UserContext } from '../../context/UserContext'
export default function Contacts({CurrentMessages,Messages,CurrentChat,MyConvo}) {
const listContact = MyConvo.myConvo;

const {UserData, setUserData} = useContext(UserContext);
//const globalChatLastMessage = Messages.messages[Messages.messages.length -1].text
  return (
    <div>
        <div className="container list-contact-body">
            List of contacts
            <div style={{height:"100%"}} className="row">
              <GlobalContact messages={Messages} CurrentChat={CurrentChat}></GlobalContact>
                {
              
                 listContact ? (
                  listContact.map(room => 
                    <Contact CurrentMessages={CurrentMessages} userData={{UserData, setUserData}} key={room.roomId} Messages={room.messages} roomMembers={room.members}  CurrentChat={CurrentChat} ></Contact>
                  )
                 ) : ('')   
                   
                }
                {/* <Contact  CurrentChat={CurrentChat} ></Contact> */}
      
       

            </div>
        </div>
    </div>
  )
}

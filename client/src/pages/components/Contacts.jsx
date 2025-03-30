import React, { useContext } from 'react'
import Contact from './Contact'
import '../css/style.css'
import GlobalContact from './GlobalContact'
import { UserContext } from '../../context/UserContext'
export default function Contacts({CurrentChat,MyConvo}) {
const listContact = MyConvo.myConvo;
  const {UserData, setUserData} = useContext(UserContext);

  return (
    <div>
        <div className="container list-contact-body">
            List of contacts
            <div style={{height:"100%"}} className="row">
              <GlobalContact CurrentChat={CurrentChat}></GlobalContact>
                {
              
                 listContact ? (
                  listContact.map(room => 
                    <Contact userData={{UserData, setUserData}} key={room.roomId} roomMembers={room.members}  CurrentChat={CurrentChat} ></Contact>
                  )
                 ) : ('')   
                   
                }
                {/* <Contact  CurrentChat={CurrentChat} ></Contact> */}
      
       

            </div>
        </div>
    </div>
  )
}

import React, { useContext,useEffect } from 'react'
import Contact from './Contact'
import '../css/style.css'

export default function Contacts({RoomId,SelectedContact,MyConvo}) {
  useEffect(() => {
  //  console.log(MyConvo.myConvo);
  }, [MyConvo.myConvo]);

//const globalChatLastMessage = Messages.messages[Messages.messages.length -1].text
  return (
    <div>
        <div className="container list-contact-body">
            List of contacts
            <div style={{height:"100%"}} className="row">
            {
             MyConvo.myConvo.map(room => <Contact MyConvo={MyConvo} RoomId={RoomId} SelectedContact={SelectedContact} key={room.roomId} room={room} ThisRoomId={room.roomId} ></Contact>)
            }
           

       

            </div>
        </div>
    </div>
  )
}

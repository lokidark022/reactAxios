import React, { useContext, useEffect, useState } from 'react'
import { Card ,Image} from 'react-bootstrap';
import imgsrcWoman from '../assets/woman.png';
import '../css/style.css';
import { UserContext } from '../../context/UserContext';
export default function Contact({MyConvo,RoomId,SelectedContact,room,ThisRoomId}) {
 const {UserData ,setUserData} =useContext(UserContext);
 var contactName = '';

 let myMsg = [];

 let myLastMsg = '';
    for (let index = 0; index < MyConvo.myConvo.length; index++) {
        if(MyConvo.myConvo[index].roomId == ThisRoomId){
            myMsg = MyConvo.myConvo[index].messages;
        }   
    }
    myLastMsg = myMsg[myMsg.length - 1].message;
    // for (let index = 0; index < MyConvo.myConvo.length; index++) {
    //     myRoom.push(MyConvo.myConvo[index].roomId)   
    // }
   // console.log(myRoom);
  return (
    <div className='col-12 contact-container' >

        <Card onClick={() => {
            SelectedContact.setSelectedContact(contactName);
            RoomId.setRoomId(room.roomId);
        }}  style={{padding:"5px",margin:"5px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Image style={{height:"25px",width:"25px"}} src={imgsrcWoman} roundedCircle />
                    </div>
                    <div className="col-7 p-0" style={{fontSize:"10px",textAlign:"left"}}>
                    {room.members.map(member => {
                        //member.email != UserData.email ? member.email : '')
                        if(member.email != UserData.email){
                            //console.log(member.email);
                            contactName = member.email;
                        }
                    }) }

                    {contactName}
                
                    </div>
                    <div className="col-3" style={{fontSize:"10px",textAlign:"right"}}>active</div>
                </div>
                <div className="row">
                  
                    <div className="col"><p>{myLastMsg}</p></div>
                </div>

            </div>
        
        </Card>
    </div>
  )
}

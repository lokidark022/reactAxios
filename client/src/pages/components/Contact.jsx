import React, { useEffect } from 'react'
import { Card ,Image} from 'react-bootstrap';
import imgsrcWoman from '../assets/woman.png';
import '../css/style.css';

export default function Contact({CurrentMessages,CurrentChat,userData,roomMembers,Messages}) {
    const contactLastMessage = Messages[Messages.length -1].message;

   // console.log(CurrentMessages);
   var email;
   let contactEmail = roomMembers.map(member => member.email !== userData.UserData.email ? member.email : '');
    for (let i = 0; i < contactEmail.length; i++) {
        if(contactEmail[i] !== ""){
            email = contactEmail[i];
           // console.log(contactEmail[i])
        }
       
    }
    //console.log(email);

    const handleSetCurrentState = () => {
        localStorage.setItem('CurrentChat',email);
        CurrentChat.setCurrentChat(email)
       
        
        CurrentMessages.setCurrentMessages(Messages);
    }
    useEffect(() => {
        const onLoad = () => {
                let myEmail = roomMembers.map(member => member.email !== userData.UserData.email ? member.email : '');
                var SelectedChat ;
                for (let i = 0; i < myEmail.length; i++) {
                    if(myEmail[i] !== ''){
                        SelectedChat = myEmail[i];
                    }
                    
                }
                if(SelectedChat == CurrentChat.currentChat) {
                    // console.log(SelectedChat );
                    // console.log(Messages);
                    CurrentMessages.setCurrentMessages(Messages);
                }
               
       
                
            // if(localStorage.getItem('CurrentChat') == CurrentChat.currentChat){
            //     console.log('loaded message for '+CurrentChat.currentChat)
            //     CurrentMessages.setCurrentMessages(Messages);
            // }else{
            //     console.log('no data');
            // }
    
        }
        onLoad();

    });

  return (
    <div className={`col contact-container ${CurrentChat.currentChat == email ? 'active' : ''}`}>

        <Card onClick={() => handleSetCurrentState()} style={{padding:"5px",margin:"5px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Image style={{height:"25px",width:"25px"}} src={imgsrcWoman} roundedCircle />
                    </div>
                    <div className="col-7 p-0" style={{fontSize:"10px",textAlign:"left"}}><p>{
                           roomMembers.map(member => member.email !== userData.UserData.email ? member.email : '')
                        }</p></div>
                    <div className="col-3" style={{fontSize:"10px",textAlign:"right"}}>active</div>
                </div>
                <div className="row">
                    <div className="col"><p>{contactLastMessage}</p></div>
                </div>

            </div>
        
        </Card>
    </div>
  )
}

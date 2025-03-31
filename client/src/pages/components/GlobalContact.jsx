import React, { useContext } from 'react'
import { Card ,Image} from 'react-bootstrap';
import imgsrcWoman from '../assets/woman.png';
import '../css/style.css';
import { GlobalMessageContext } from '../../context/UserContext';
export default function GlobalContact({messages,CurrentChat}) {
    const {GlobalMessages, setGlobalMessages} = useContext(GlobalMessageContext);
    let globalChatLastMessage = '';
   // console.log(GlobalMessages);
    if(GlobalMessages){
      // console.log(GlobalMessages)

        GlobalMessages.length !== 0 ? globalChatLastMessage = GlobalMessages[GlobalMessages.length - 1].message : ''
       // console.log(globalChatLastMessage);
    }
   const changeCurrentState = () => {
    localStorage.setItem('CurrentChat','Global');
    CurrentChat.setCurrentChat('Global');
   }
  return (
    <div className={`col contact-container ${CurrentChat.currentChat == 'Global' ? 'active' : ''}`}>
        <Card onClick={() => changeCurrentState()} style={{padding:"5px",margin:"5px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Image style={{height:"25px",width:"25px"}} src={imgsrcWoman} roundedCircle />
                    </div>
                    <div className="col" style={{fontSize:"10px"}}>Global Chats</div>
                    <div className="col-5" style={{fontSize:"10px"}}>active user: </div>
                </div>
                <div className="row">
                    <div className="col"><p>{globalChatLastMessage}</p></div>
                </div>

            </div>
        
        </Card>
    </div>
  )
}

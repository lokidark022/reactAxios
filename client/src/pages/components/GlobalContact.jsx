import React from 'react'
import { Card ,Image} from 'react-bootstrap';
import imgsrcWoman from '../assets/woman.png';
import '../css/style.css';
export default function GlobalContact({CurrentChat}) {
  return (
    <div className='col contact-container'>
        <Card onClick={() => CurrentChat.setCurrentChat('Global')} style={{padding:"5px",margin:"5px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Image style={{height:"25px",width:"25px"}} src={imgsrcWoman} roundedCircle />
                    </div>
                    <div className="col" style={{fontSize:"10px"}}>Global Chats</div>
                    <div className="col-5" style={{fontSize:"10px"}}>active user: </div>
                </div>
                <div className="row">
                    <div className="col"><p>awxdoawudhau hawudawihawdihawdxawxawxxawxdawxdawxawxawxawxdawxdawdlahwdhawdhawiodhxioawhdxoiawhxdioawxhdoaiwxdhaoiwdxhawoidxawduhawxduihawiu</p></div>
                </div>

            </div>
        
        </Card>
    </div>
  )
}

import React from 'react'
import { Card ,Image} from 'react-bootstrap';
import imgsrcWoman from '../assets/woman.png';
import '../css/style.css';
export default function Contact() {
  return (
    <div className='col contact-container'>
        <Card style={{padding:"5px",margin:"5px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <Image style={{height:"25px",width:"25px"}} src={imgsrcWoman} roundedCircle />
                    </div>
                    <div className="col" style={{fontSize:"10px"}}>admin@admin.com</div>
                    <div className="col-3" style={{fontSize:"10px"}}>active</div>
                </div>
                <div className="row">
                    <div className="col"><p>awxdoawudhau hawudawihawdihawdxawxawxxawxdawxdawxawxawxawxdawxdawdlahwdhawdhawiodhxioawhdxoiawhxdioawxhdoaiwxdhaoiwdxhawoidxawduhawxduihawiu</p></div>
                </div>

            </div>
        
        </Card>
    </div>
  )
}

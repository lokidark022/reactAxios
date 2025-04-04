import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
const MessageHeader = ({SelectedContact}) => {
   // console.log(headerData.HeaderData.length);

   // console.log(headerData)

    return (
        <div className='m-2 p-2 border' style={{height:"50px"}}>
                 <Nav variant="underline" defaultActiveKey="/home">
                      <Nav.Item>
                         {SelectedContact.selectedContact}
                      </Nav.Item>
                  
      
      
                      </Nav>
    

      
        </div>
    );
}

export default MessageHeader;

import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
const MessageHeader = ({headerData}) => {
   // console.log(headerData.HeaderData.length);



    return (
        <div className='m-2 p-2 border' style={{height:"50px"}}>
          
            <Nav variant="underline" defaultActiveKey="/home">
                <Nav.Item>
                    Global Chats
                </Nav.Item>
                <Nav.Item>
                    Active Users: {headerData.HeaderData ? headerData.HeaderData.length : 0}
                </Nav.Item>


            </Nav>
        </div>
    );
}

export default MessageHeader;

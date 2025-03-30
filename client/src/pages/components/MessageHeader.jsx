import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
const MessageHeader = ({headerData,CurrentChat}) => {
   // console.log(headerData.HeaderData.length);



    return (
        <div className='m-2 p-2 border' style={{height:"50px"}}>
            {CurrentChat.currentChat == 'Global' ? (
                      <Nav variant="underline" defaultActiveKey="/home">
                      <Nav.Item>
                          Global Chats
                      </Nav.Item>
                      <Nav.Item>
                          Active Users: {headerData.HeaderData ? headerData.HeaderData.length : 0}
                      </Nav.Item>
      
      
                  </Nav>
            ) : (
                <Nav variant="underline" defaultActiveKey="/home">
                <Nav.Item>
                    {CurrentChat.currentChat}
                </Nav.Item>
           


            </Nav>

            )}

      
        </div>
    );
}

export default MessageHeader;

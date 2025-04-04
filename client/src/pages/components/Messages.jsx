import React, { useEffect, useRef, useState,useContext } from 'react'
import MessageFooter from './MessageFooter'
import MessageBody from './MessageBody'
import MessageHeader from './MessageHeader'

function Messages({RoomId,SelectedContact,MyConvo}) {


  return (

    <div> 
    

               <MessageHeader SelectedContact={SelectedContact}></MessageHeader>
                <MessageBody RoomId={RoomId} SelectedContact={SelectedContact} MyConvo={MyConvo}>
                </MessageBody>
               <MessageFooter  RoomId={RoomId}></MessageFooter>
    </div>
  )
}

export default Messages
import React, { useState } from 'react'
import MessageFooter from './MessageFooter'
import MessageBody from './MessageBody'
import MessageHeader from './MessageHeader'
function Messages({socket}) {
  const [HeaderData, setHeaderData] = useState();
  return (

    <div>
            <MessageHeader headerData={{HeaderData, setHeaderData}}></MessageHeader>
           <MessageBody socket={socket} headerData={{HeaderData, setHeaderData}}></MessageBody>
          <MessageFooter socket={socket}></MessageFooter>
    </div>
  )
}

export default Messages
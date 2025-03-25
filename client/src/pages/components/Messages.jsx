import React from 'react'
import MessageFooter from './MessageFooter'
import MessageBody from './MessageBody'
function Messages({socket}) {
  return (
    <div>
        <MessageBody socket={socket}></MessageBody>
          <MessageFooter socket={socket}></MessageFooter>
    </div>
  )
}

export default Messages
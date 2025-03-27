import React, { useContext ,useState} from 'react';
import { UserContext } from '../../context/UserContext';

const MessageFooter = ({socket,userData}) => {
    const {UserData, setUserData} = useContext(UserContext);
    const [message , setMessage] = useState("");
    const handleSend = () => {
        
        socket.emit('message', {
            text: message,
            name: UserData.email,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
          });
          document.getElementById('textMessage').value = "";

    }
    const handleTyping = () =>{
        socket.emit('typing', `${userData.email} is typing`);
    }
    return (
        <div >

<div className="input-group">
      <textarea  id='textMessage' wrap="on" style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleTyping} className="form-control custom-control" rows="1"></textarea>     
      <span  onClick={() => handleSend()} className="input-group-addon btn btn-primary">Send</span>
  </div>

        </div>
    );
}

export default MessageFooter;

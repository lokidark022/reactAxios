import React, { useContext ,useState} from 'react';
import { UserContext } from '../../context/UserContext';

const MessageFooter = ({socket}) => {
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
    return (
        <div >

<div className="input-group">
      <textarea id='textMessage' wrap="on" style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)} className="form-control custom-control" rows="1"></textarea>     
      <span  onClick={() => handleSend()} className="input-group-addon btn btn-primary">Send</span>
  </div>

        </div>
    );
}

export default MessageFooter;

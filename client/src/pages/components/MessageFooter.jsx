import React, { useContext ,useState} from 'react';
import { UserContext } from '../../context/UserContext';

const MessageFooter = ({socket,userData}) => {
    const {UserData, setUserData} = useContext(UserContext);
    const [message , setMessage] = useState('');
    const handleSend = () => {
        if(message !== ''){
            socket.emit('message', {
                message: message,
                sender: UserData.email,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
              });
              setMessage('');
              document.getElementById('textMessage').value = "";
            
        }


    }
    const handleTyping = () =>{
        if(message !== ''){
            socket.emit('typing', `${userData.email} is typing`);
        }else{
            socket.emit('not_typing');
        }
        
    }
    return (
        <div >

<div className="input-group">
      <textarea  id='textMessage' wrap="on" style={{resize:"none"}} onChange={(e) => setMessage(e.target.value)}
      onKeyUp={handleTyping} className="form-control custom-control" rows="1"></textarea>     
      <span  onClick={() => handleSend()} className="input-group-addon btn btn-primary">Send</span>
  </div>

        </div>
    );
}

export default MessageFooter;

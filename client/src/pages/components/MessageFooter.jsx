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
    }
    return (
        <div>
            <h5>Welcome {UserData.email}</h5>
            <input onChange={(e) => setMessage(e.target.value)} type="text" name="" id="" placeholder='Send Message' />
            <button onClick={() => handleSend()}> Send</button>
        </div>
    );
}

export default MessageFooter;

import React, { useContext ,useState} from 'react';
import { UserContext } from '../../context/UserContext';
import { sendPrivateMsg } from '../module/socket';
const MessageFooter = ({RoomId}) => {
    const {UserData, setUserData} = useContext(UserContext);
   const [textMsg, setTextMsg] = useState('');
    
    const handleSend = () => {
        console.log(textMsg);
        if(textMsg !== ''){
            console.log('send')
            sendPrivateMsg({roomId:RoomId.roomId,message:textMsg,sender:UserData.email});
            setTextMsg('');
            document.getElementById('msg').value =  '';
        }else{
            console.log('not send');
        }
    }
    return (
        <div >

<div className="input-group">
      <textarea id='msg' onChange={(e) => setTextMsg(e.target.value)} wrap="on" style={{resize:"none"}} 
       className="form-control custom-control" rows="1"></textarea>     
      <span onClick={() => handleSend()}   className="input-group-addon btn btn-primary">Send</span>
  </div>

        </div>
    );
}

export default MessageFooter;

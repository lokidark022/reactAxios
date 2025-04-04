import React, { useContext,useEffect } from 'react';
import socketIO from 'socket.io-client';
import { UserContext } from '../../context/UserContext';
export const socket = socketIO.connect('http://localhost:5001');



export const myConvoReq = (data) => {

    socket.emit('myConvo',(data));

}
export const sendPrivateMsg = (data) =>{
    socket.emit('privateMessage',(data));
}
export const joinRoom = (data) => {
    socket.emit('join_room',(data));
}
import React, {useState,useEffect} from 'react';

import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = ({location}) => {
    let ENDPOINT = 'localhost:5000';

    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    /* This will work like componentDidMount method 
        second argument is like this method will update
        if any of those arguments are changed
    */
    useEffect(() => {
        // setting the name and room value from search param
        const {name,room} = queryString.parse(location.search);

        // console.log({name,room});
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        // A event is emiited with these 2 vaues getting passed as object
        socket.emit('join',{name,room},() => {

        });
        // console.log(socket);
        // return as a function in hooks
        return () => {
            // emit the disconnect event
            socket.emit('disconnect');
            // After disconnect close the connection instance 
            socket.off();
        }
        

    },[ENDPOINT,location.search])

    return ( 
        <h1>Chat</h1>   
    )
}
export default Chat;
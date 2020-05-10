import React, {useState,useEffect} from 'react';

import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infobar/infobar';
import Input from '../input/Input';
import Messages from  '../messages/messages';
import './chat.css';
let socket;
const Chat = ({location}) => {
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);


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
        socket.emit('join',{name,room},(error) => {
          
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


    // Handling messages

    useEffect(() => {
        socket.on('message',(message) => {
            // add the messages within setMessage array
            setMessages([...messages,message]); 
        })
    },[messages])

    // function for sending the message
    const sendMessage = (event) => {
        event.preventDefault(); 
        // console.log(event);
        if(message) {
            
            socket.emit('sendMessage',message,() => {
                setMessage('');
            });
        }
    }
    console.log({message,messages});
    return ( 
       <div className='outerContainer'>
            <div className='container'>
            <InfoBar room={room}/>
            <Messages 
            messages  = {messages}
            name={name}
            />
               <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
               />
            </div>
       </div>
    )
}
export default Chat;
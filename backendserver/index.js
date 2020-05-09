const express = require('express');
const socketio = require('socket.io');
const router = require('./router');
const PORT = process.env.PORT || 5000;
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.use(router);

const {addUser,removeUser,getUser,getUsersInRoom} = require('./user');

io.on('connection',(socket) => {
    console.log(`socket connection`);

    socket.on('join',({name,room},callback) => {
        console.log(`${name} ${room}`);
        const {error,user} = addUser({id:socketio.id,name,room});
        
        if(error) {return callback(error)};
        // let the user know that he is joined
        socket.emit('message',{user:'admin',text:`${user.name} welcome to room ${user.room}`});

        // let others in the room know that user is joined
        socket.broadcast.to(user.room).emit('message',{user:'admin',message:`${user.name} is joined`});

        socket.join(user.room);

        callback();

    })
    socket.on('disconnect', () => {
        console.log(`User leave the room`);
    })
});


server.listen(PORT,() => {
    console.log(`Backend is running on port ${PORT}`);
});

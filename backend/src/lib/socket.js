import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        credentials:true,
    }
})

const onlineUsers = new Map();

io.on("connection",(socket)=>{
   

    socket.on('addUser', (userId) => {
      
      
        onlineUsers.set(userId, socket.id);
           console.log("user connected",socket.id)
         io.emit('onlineUsers', Array.from(onlineUsers.keys()));
        console.log(onlineUsers)
    });

  socket.on('sendMessage', ({ senderId, recieverId, content, image,_id,createdAt }) => {
    console.log({ senderId, recieverId, content, image,_id,createdAt })
    const receiverSocketId = onlineUsers.get(recieverId);
    console.log(receiverSocketId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        _id,
        senderId,
        content,
        createdAt,
        image:image
      });
    }
  });

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        for (let [userId, sockId] of onlineUsers.entries()) {
    if (sockId === socket.id) {
      onlineUsers.delete(userId);
      break;
    }
    
  }
   io.emit('onlineUsers', Array.from(onlineUsers.keys()));
    })
})
export {io,app,server};

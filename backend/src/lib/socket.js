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
    console.log("user connected",socket.id)

    socket.on('addUser', (userId) => {
      
        
        onlineUsers.set(userId, socket.id);
        console.log(onlineUsers)
    });

  socket.on('sendMessage', ({ senderId, receiverId, content }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        senderId,
        content,
        createdAt: new Date(),
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
    })
})
export {io,app,server};

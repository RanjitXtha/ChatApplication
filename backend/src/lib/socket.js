import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import Message from '../models/message.model.js';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5172'],
    credentials: true,
  }
})

const onlineUsers = new Map();

io.on("connection", (socket) => {


  socket.on('addUser', (userId) => {


    onlineUsers.set(userId, socket.id);

    io.emit('onlineUsers', Array.from(onlineUsers.keys()));

  });

  socket.on('sendMessage', async(message) => {
    console.log("userMEssage", message);
    const receiverSocketId = onlineUsers.get(message.recieverId);
    console.log(receiverSocketId)
    if (receiverSocketId) {
      console.log("sending message")
      io.to(receiverSocketId).emit('receiveMessage', message);
    }
  });

  socket.on("group:join", (groupId) => {
    console.log("joining socket", groupId);
    socket.join(groupId);
  })

  socket.on("group:sendMessage", (message) => {
    console.log("message reieved", message);
    console.log("sending message")
    io.to(message.recieverId).emit("group:recieveMessage", message);


  })


  socket.on("markAsRead", async ({ fromUserId, toUserId }) => {
    await Message.updateMany(
      { senderId: fromUserId, recieverId: toUserId, isRead: false },
      { $set: { isRead: true } }
    );

    // Optionally, emit back updated count
    const unreadCount = await Message.countDocuments({
      recieverId: toUserId,
      isRead: false,
    });

    io.to(toUserId).emit("updateUnreadCount", unreadCount);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }

    }
    io.emit('onlineUsers', Array.from(onlineUsers.keys()));
  })
})
export { io, app, server };

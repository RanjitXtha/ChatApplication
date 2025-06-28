import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import socket from '../utils/socket.js'; // 👈 import socket

const ChatSection = () => {
  const currentChatId = useSelector((state) => state.currentChat.currentChatId);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);

  // ✅ Emit message to server via socket
  const handleMessage = async () => {
    if (!content.trim()) return;

    const newMessage = {
      senderId: currentUser.userId,
      receiverId: currentChatId,
      content,
    };

    socket.emit('sendMessage', newMessage);

    // Optimistically add message to UI
    setMessages((prev) => [...prev, { ...newMessage, createdAt: new Date() }]);
    setContent('');

    // (optional) still save to DB via API
    try {
      await axios.post(`/chat/message/${currentChatId}`, { content }, { withCredentials: true });
    } catch (err) {
      console.error('Failed to store message in DB:', err);
    }
  };

  // ✅ Fetch chat history
  useEffect(() => {
    const getMessages = async () => {
      if (!currentChatId) return;

      try {
        const res = await axios.get(`/chat/message/${currentChatId}`, {
          withCredentials: true,
        });

        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [currentChatId]);

  // ✅ Setup socket listeners
useEffect(() => {
  if (!currentUser) return;

  console.log(currentUser.userId)

  socket.emit('addUser', currentUser.userId);

  socket.on('receiveMessage', (data) => {
    if (data.senderId === currentChatId || data.receiverId === currentChatId) {
      setMessages((prev) => [...prev, data]);
    }
  });

  return () => socket.off('receiveMessage');
}, [currentUser, currentChatId]);

  return (
    <div className="flex flex-col h-[80vh] border rounded p-4">
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col-reverse gap-2">
        {[...messages].reverse().map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] p-2 rounded-lg text-white ${
              msg.senderId === currentUser.userId
                ? 'bg-blue-500 self-end text-right'
                : 'bg-gray-500 self-start text-left'
            }`}
          >
            {msg.content}
            <div className="text-xs text-gray-200 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          type="text"
          placeholder="Send message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;

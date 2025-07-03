import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import socket from '../utils/socket.js';
import Messages from '../Components/Messages.jsx';
import MessageInput from '../Components/MessageInput.jsx';

const ChatSection = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const contact = useSelector((state) => state.currentChat.currentChatUser);

  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendFile, setSendFile] = useState(null)
  const [preview, setPreview] = useState(null);

  const handleMessage = async () => {
    if (!content.trim() && !sendFile) return;

    const newMessage = new FormData();
    newMessage.append('content', content);
    newMessage.append('senderId', currentUser.userId);
    newMessage.append('receiverId', contact._id);

    if (sendFile) {
      newMessage.append('image', sendFile);
    }
    setMessages((prev) => [
      ...prev,
      {
        content,
        senderId: currentUser.userId,
        receiverId: contact._id,
        image: preview,
        createdAt: new Date(),
      },
    ]);
    
    setContent('');
    setSendFile(null);
    setPreview(null);

    try {
      const res = await axios.post(`/chat/message/${contact._id}`, newMessage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      const sentMessage = res.data.newMessage;

      socket.emit('sendMessage', {
        _id: sentMessage._id,
        content: sentMessage.content,
        senderId: sentMessage.senderId,
        recieverId: sentMessage.recieverId,
        image: sentMessage.image || null,
        createdAt: sentMessage.createdAt,
      });
    } catch (err) {
      console.error('Failed to store message in DB:', err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (!contact._id) return;

      try {
        const res = await axios.get(`/chat/message/${contact._id}`, {
          withCredentials: true,
        });

        setMessages(res.data.messages || []);
        console.log(res.data.messages)
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [contact._id]);


  useEffect(() => {
    if (!currentUser) return;

    socket.on('receiveMessage', (data) => {
      if (data.senderId === contact._id || data.receiverId === contact._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off('receiveMessage');
  }, [currentUser, contact._id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSendFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  return (
    contact._id &&
    <div className="flex flex-col h-screen text-white">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={contact.profilePic} alt={contact.username} className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">

              </img>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{contact.username}</h2>
            </div>
          </div>
        </div>
      </div>

      
      <Messages contact={contact} currentUser={currentUser} messages={messages} />

      <MessageInput setPreview={setPreview} setSendFile={setSendFile} handleFileChange={handleFileChange}
      setContent={setContent} handleMessage={handleMessage} preview={preview} content={content} />


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
        
       
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>

    </div>
  );
};

export default ChatSection;

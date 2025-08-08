import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import socket from '../utils/socket.js';
import Messages from '../Components/Messages.jsx';
import MessageInput from '../Components/MessageInput.jsx';

const ChatSection = ({ setUnreadMessages, unreadMessages }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const contact = useSelector((state) => state.currentChat.currentChatUser);
  const chatType = useSelector((state) => state.currentChat.currentChatType);



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
      console.log("sentMessage", sentMessage);

      if (chatType === "group") {
        console.log("sending group message")
        socket.emit("group:sendMessage", sentMessage)

      } else {
        console.log("receiving user message")
        setMessages((prev) => [
          ...prev,
          sentMessage
        ]);

        socket.emit('sendMessage', sentMessage);
      }
    } catch (err) {
      console.error('Failed to store message in DB:', err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      if (!contact._id) return;

      try {
        const res = await axios.get(`/chat/message/${contact._id}?chatType=${chatType}`, {
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
    if (chatType === "group" && contact._id) {
      socket.emit("group:join", contact._id);
      console.log("Joined group socket room:", contact._id);
    }
  }, [chatType, contact._id]);

  useEffect(() => {
    if (!currentUser) return;

    if (chatType === "group") {
      console.log("receiving group message")
      socket.on("group:recieveMessage", (message) => {
        console.log("group:recieveMessage", message);
        console.log("contact_id", contact._id);

        if ((message.recieverId === contact._id)) {
          setMessages((prev) => [...prev, message]);

        }
      })
    } else {
      console.log("receiving user message")

      socket.on('receiveMessage', (data) => {
        console.log("data", data);


        console.log("contact_id", contact._id);
        if ((data.recieverId === currentUser.userId) && (data.senderId._id === contact._id)) {

          setMessages((prev) => [...prev, data]);

        }else{
                  setUnreadMessages(prev => [...prev, data]);

        }


      });
    }



    return () => {
      socket.off('receiveMessage');
      socket.off('group:recieveMessage');
    }

  }, [currentUser, contact._id]);

  useEffect(() => {
    socket.emit("markAsRead", {
      fromUserId: contact._id,
      toUserId: currentUser.userId,
    });

    setUnreadMessages(prev => {
      return prev.filter(messages => messages.senderId._id !== contact._id);
    })
  }, [contact._id]);

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
              <img src={contact?.profilePic} alt={contact.username} className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">

              </img>
            </div>
            <div>
              <h2 className="font-semibold text-lg">{contact.username}</h2>
              {
                chatType === "group" && <p>{contact._id}</p>
              }

            </div>
          </div>
        </div>
      </div>


      <Messages contact={contact} currentUser={currentUser} messages={messages} />

      <MessageInput setPreview={setPreview} setSendFile={setSendFile} handleFileChange={handleFileChange}
        setContent={setContent} handleMessage={handleMessage} preview={preview} content={content} />

      {/* 
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
      `}</style> */}

    </div>
  );
};

export default ChatSection;

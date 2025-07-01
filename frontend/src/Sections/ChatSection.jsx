import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios.js';
import socket from '../utils/socket.js';
import { LuSend } from "react-icons/lu";
import { FaPaperclip } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const ChatSection = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const contact = useSelector((state) => state.currentChat.currentChatUser);

  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendFile, setSendFile] = useState(null)
  const [preview, setPreview] = useState(null);
  const bottomRef = useRef(null);

  const handleMessage = async () => {
    if (!content.trim()) return;

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


    console.log('message set')
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
      console.log(sentMessage)

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

    // Optional preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    contact._id &&
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={contact.profilePic} alt={contact.username} className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">

              </img>
              {/* {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-black rounded-full"></div>
                )} */}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{contact.username}</h2>
              {/* <p className="text-sm text-gray-400">
                  {contacts[selectedChat]?.online ? 'Active now' : 'Last seen recently'}
                </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {[...messages].map((msg, index) => (
          <div
            key={msg._id || `temp-${index}`}
            className={`flex ${msg.senderId === currentUser.userId ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.senderId === currentUser.userId ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {msg.senderId !== currentUser.userId && (
                <div className="w-8 h-8 bg-gray-600 rounded-xl flex items-center justify-center text-sm flex-shrink-0">
                  {msg.avatar}
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${msg.senderId === currentUser.userId
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-gray-700 text-white rounded-bl-md'
                  } shadow-lg transition-all duration-200`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                {
                  msg.image &&



                  <img src={msg.image} alt={"image-file"} />

                }

                <p className="text-xs mt-1 opacity-70">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>


      <div className="bg-gray-800 border-t border-gray-700 p-4">
        {
          preview &&
          <img src={preview} alt="preview" />
        }
        <div className="flex items-center space-x-3 text-white">
          <input hidden accept="*/*" type="file" id="upload" onChange={handleFileChange} className="p-3 hover:bg-gray-700 rounded-xl transition-all duration-200" />

          <label htmlFor="upload">
            <FaPaperclip />
          </label>

          <div className="flex-1 relative">

            <input
              type="text"
              placeholder="Send message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleMessage();
                }
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none max-h-32"

            />

            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-600 rounded-lg transition-all duration-200">
              <MdOutlineEmojiEmotions />
            </button>
          </div>
          <button
            onClick={handleMessage}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 transform active:scale-95"
          >
            <LuSend />
          </button>
        </div>
      </div>


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

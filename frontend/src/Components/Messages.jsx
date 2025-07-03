import { useRef , useEffect } from 'react';

const Messages = ({messages,currentUser,contact}) => {
      const bottomRef = useRef(null);

        useEffect(() => {
            if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={msg._id || `temp-${index}`}
                className={`flex ${msg.senderId === currentUser.userId ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.senderId === currentUser.userId ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.senderId !== currentUser.userId && (
                    <img src={contact.profilePic} className="w-8 h-8 bg-gray-600 rounded-xl flex items-center justify-center text-sm flex-shrink-0" />
                      
                    
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
  )
}

export default Messages
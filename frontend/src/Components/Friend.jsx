import React from 'react'

const Friend = ({handleCurrentChat,user}) => {
  return (
    <div
              className={`p-4 mx-3 my-1 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
                selectedChat === contact.id 
                  ? 'bg-gray-700 border border-blue-500' 
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-600 rounded-2xl flex items-center justify-center text-xl">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-400">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
  )
}

export default Friend
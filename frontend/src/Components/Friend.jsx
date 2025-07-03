import React, { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { setCurrentChatUser } from '../utils/currentChat';
import axios from '../utils/axios'
const Friend = ({user,listType}) => {

  const currentChatId = useSelector(state=>state.currentChat.currentChatUser?._id);
       const onlineUserIds = useSelector((state)=>state.currentChat.onlineUsers);

  const addFriend = async (friendId) => {
  try {
    const res = await axios.post(
      `/chat/add-friend`,
      { friendId },
      { withCredentials: true }
    );
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || 'Error adding friend');
  }
};


  const dispatch = useDispatch();
  const handleCurrentChatUser = (user)=>{
    dispatch(setCurrentChatUser(user));
    if(listType==="allusers"){
      addFriend(user._id)
    }
   
   
  } 
  return (
    <div onClick={()=>handleCurrentChatUser(user)}
              className={`p-4 mx-3 my-1 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
                currentChatId === user._id 
                  ? 'bg-gray-700 border border-blue-500' 
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src= {user.profilePic} alt={user.username} className="w-12 h-12 bg-gray-600 rounded-2xl flex items-center justify-center text-xl">
                   
                  </img>
                  {onlineUserIds.includes(user._id) ? (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                  ):<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{user.username}</h3>
                    {/* <span className="text-xs text-gray-400">{contact.time}</span> */}
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 truncate">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
  )
}

export default Friend
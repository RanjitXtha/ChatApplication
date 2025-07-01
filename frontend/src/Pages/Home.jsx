import React from 'react';
import Search from '../Components/Search';
import Friends from '../Sections/Friends';
import ChatSection from '../Sections/ChatSection';
import SideBar from '../Sections/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect ,useState} from 'react';
import socket from '../utils/socket';
import { setOnlineUsers } from '../utils/currentChat';
const Home = () => {
  const currentChatUser = useSelector((state)=>state.currentChat.currentChatUser);
    const currentUser= useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch();


useEffect(() => {
  socket.on('onlineUsers', (userIds) => {
    console.log(userIds)
    dispatch(setOnlineUsers(userIds));
  });

  return () => socket.off('onlineUsers');
}, []);

useEffect(() => {
  if (!currentUser) return;

  console.log(currentUser.userId)

  socket.emit('addUser', currentUser.userId);

}, [currentUser]);

 
  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen  ">
      <SideBar />
      {
currentChatUser &&
 <ChatSection />
      }
    
      {/* <Search />
      <Friends />
       */}
    </div>
  );
};

export default Home;

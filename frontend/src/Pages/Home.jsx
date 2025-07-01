import React from 'react';
import Search from '../Components/Search';
import Friends from '../Sections/Friends';
import ChatSection from '../Sections/ChatSection';
import SideBar from '../Sections/SideBar';
import { useSelector } from 'react-redux';
import { useEffect ,useState} from 'react';
import socket from '../utils/socket';
const Home = () => {
  const currentChatUser = useSelector((state)=>state.currentChat.currentChatUser);
  const [onlineUserIds, setOnlineUserIds] = useState([]);

useEffect(() => {
  socket.on('onlineUsers', (userIds) => {
    setOnlineUserIds(userIds);
  });

  return () => socket.off('onlineUsers');
}, []);

 
  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen  ">
      <SideBar onlineUserIds={onlineUserIds} />
      {
currentChatUser &&
 <ChatSection onlineUserIds={onlineUserIds} />
      }
    
      {/* <Search />
      <Friends />
       */}
    </div>
  );
};

export default Home;

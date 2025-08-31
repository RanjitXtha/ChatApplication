import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Friends from './Friends'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { clearCredentials } from '../utils/authSlice';
import AllUsers from './AllUsers';
import GroupChat from './Groups';
const SideBar = ({unreadMessages}) => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const onlineUserIds = useSelector((state)=>state.currentChat.onlineUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const [isOnline,setOnline] = useState(false)
  useEffect(()=>{
    if(currentUser)
    setOnline(onlineUserIds.includes(currentUser.userId))
  },[onlineUserIds]);

  const handleLogout = async()=>{
    await axios.get('/auth/logout');
    console.log('logged out');
    dispatch(clearCredentials());
    navigate('/login')
  }


  return (
    <div className='bg-gray-800 border-r border-gray-700 text-white overflow-y-auto'>
      <p>{unreadMessages?.length}</p>
        <div className='border-b-1 pb-3 border-b-gray-600 p-[1rem]'>
            <header className='flex justify-between items-center mb-4 '>
                <h1 className='text-2xl font-extrabold'>BeeChat</h1>
                <div className='relative'>       
                {
                  
               currentUser && 
               <div className='relative group'>
               <img src={currentUser.profilePic} alt={currentUser.username} className='bg-black w-10 h-10 rounded-full' />
               <div className=' hidden group-hover:block absolute w-[10rem] right-[1rem] top-[2rem] z-100 p-4 bg-gray-800 border-[1px] border-gray-700'>
                  <p>{currentUser.username}</p>
                  <Link to="/profile">Profile</Link><br />
                  <button onClick={handleLogout}>Logout</button>

               </div>
              </div>
              
}
                {
                  isOnline &&
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                }
                </div>
            </header>
            <Search />
        </div>

        <Friends unreadMessages={unreadMessages}/>
        <GroupChat unreadMessages={unreadMessages} />
        <AllUsers />
      
        
        
         

    </div>
  )
}

export default SideBar
import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Friends from './Friends'
import { useSelector } from 'react-redux'
const SideBar = () => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const onlineUserIds = useSelector((state)=>state.currentChat.onlineUsers);

  
  const [isOnline,setOnline] = useState(false)
console.log(onlineUserIds);
  useEffect(()=>{
    if(currentUser)
    setOnline(onlineUserIds.includes(currentUser.userId))
  },[onlineUserIds])


  return (
    <div className='bg-gray-800 border-r border-gray-700 text-white'>
        <div className='border-b-1 pb-3 border-b-gray-600 p-[1rem]'>
            <header className='flex justify-between items-center mb-4 '>
                <h1 className='text-2xl font-extrabold'>BeeChat</h1>
                <div className='relative'>

                
                {
                  
               currentUser && <img src={currentUser.profilePic} alt={currentUser.username} className='bg-black w-10 h-10 rounded-full' />
}
                {
                  isOnline &&
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                }
                </div>
            </header>
            <Search />
        </div>

        <Friends />

        
        
         

    </div>
  )
}

export default SideBar
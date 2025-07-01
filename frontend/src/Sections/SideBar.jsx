import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Friends from './Friends'
import { useSelector } from 'react-redux'
const SideBar = ({onlineUserIds}) => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  console.log(currentUser);
  const [isOnline,setOnline] = useState(false)

  console.log("online users")
  console.log(onlineUserIds)


  return (
    <div className='bg-gray-800 border-r border-gray-700 text-white'>
        <div className='border-b-1 pb-3 border-b-gray-600 p-[1rem]'>
            <header className='flex justify-between items-center mb-4 '>
                <h1 className='text-2xl font-extrabold'>BeeChat</h1>{
               currentUser && <img src={currentUser.profilePic} alt="profile-pic" className='bg-black w-10 h-10 rounded-full' />
}
                {
                  isOnline &&
                  <p>isOnline</p>
                }
            </header>
            <Search />
        </div>

        <Friends />

        
        
         

    </div>
  )
}

export default SideBar
import axios from '../utils/axios.js'
import React, { useEffect, useState } from 'react'
import Friend from '../Components/Friend.jsx';
import { useSelector } from 'react-redux';
const Friends = () => {
    const [friends , setFriends] = useState([]);
     const onlineUserIds = useSelector((state)=>state.currentChat.onlineUsers);
  
    useEffect(()=>{
        const getFriends = async()=>{

            try{

          
            const res = await axios.get('/chat/friends',{
                withCredentials:true,
            })
            setFriends(res.data.friends);

              }catch(err){
                console.log(err);
              }
        }

        getFriends();
    },[])
  return (
   
    <div>
      <h1 className='p-4 text-lg font-bold'>Friends<div className='text-sm font-extralight'>(Search friend to add as friend)</div></h1>
  {friends.length > 0 ?   <div className="py-1 flex-1 overflow-y-auto">
      
          <ul>
            {friends.map((user) => (
              <Friend  key={user._id} listType={'friends'}
              user={user} />
            ))}
          </ul>
        </div>:<div></div>
  }
    </div>
  )
}

export default Friends
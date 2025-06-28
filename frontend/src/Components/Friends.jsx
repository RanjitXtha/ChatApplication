import { useDispatch } from 'react-redux';
import axios from '../utils/axios.js'
import React, { useEffect, useState } from 'react'
import { setCurrentChat } from '../utils/currentChat.js';
const Friends = () => {
    const [friends , setFriends] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getFriends = async()=>{

            try{

          
            const res = await axios.get('/chat/friends',{
                withCredentials:true,
            })
            setFriends(res.data.friends);

            console.log(res.data.friends);   
              }catch(err){
                console.log(err);
              }
        }

        getFriends();
    },[])

    const  handleCurrentChat= (currentChatId)=>{
        console.log(currentChatId)
        dispatch(setCurrentChat(currentChatId));
    }
  return (
   
    <div>
  {friends.length > 0 ?   <div className="bg-white p-4 rounded shadow-md">
      
          <h3 className="text-lg font-semibold mb-2">Friends:</h3>
          <ul>
            {friends.map((user) => (
              <li key={user._id} onClick={()=>handleCurrentChat(user._id)} className="mb-2 flex items-center gap-3">
                <img
                  src={user.profilePic || '/default-avatar.png'}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>:<div>Loading</div>
  }
    </div>
  )
}

export default Friends
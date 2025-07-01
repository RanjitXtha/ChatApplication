import axios from '../utils/axios.js'
import React, { useEffect, useState } from 'react'
import Friend from '../Components/Friend.jsx';

const Friends = () => {
    const [friends , setFriends] = useState([]);
   
  
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
  return (
   
    <div>
  {friends.length > 0 ?   <div className="py-1 flex-1 overflow-y-auto">
      
          <ul>
            {friends.map((user) => (
              <Friend key={user._id} 
              user={user} />
            ))}
          </ul>
        </div>:<div>Loading</div>
  }
    </div>
  )
}

export default Friends
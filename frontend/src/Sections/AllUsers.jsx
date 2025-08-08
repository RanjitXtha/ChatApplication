import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from '../utils/axios';
import { useState } from 'react';
 import Friend from '../Components/Friend';

const AllUsers = () => {
    const [users,setUsers] = useState([]);
    
    const currentUser = useSelector((state)=>state.user.currentUser);

    useEffect(()=>{
        const getUsers = async()=>{
            const res=  await axios.get(`/chat/getAllUsers/${currentUser.userId}`);
            setUsers(res.data.allUsers);
        }
        getUsers();
    },[currentUser]);

  return (
    <div>
      <h1 className='p-4 text-lg font-bold'>Users({users.length})</h1>
  {users.length > 0  ?   <div className="py-1 flex-1 overflow-y-auto">
      
          <ul>
            {users.map((user) => (
              <Friend  key={user._id}  listType={'allusers'}
              user={user} />
            ))}
          </ul>
        </div>:<div></div>
  }
    </div>
  )
}

export default AllUsers
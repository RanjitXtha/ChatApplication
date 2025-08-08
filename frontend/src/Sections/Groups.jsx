import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Group from '../Components/Group';
const GroupChat = () => {
  const currentUser = useSelector((state)=>state.user.currentUser);
  const [groups, setGroups] = useState([]);

  useEffect(()=>{
    const getGroups = async()=>{
      try{
        
        const response = await axiosInstance.get(`/group-chat/get-groups/${currentUser.userId}`);
        console.log(response);
        setGroups(response.data.data);
      }catch(error){
        console.log(error);
      }
      
    }

    getGroups();
  },[currentUser.useId])
  return (
    <div>
        Groups
        <Link to="/create-group">+</Link>

        <div>
          {
            groups.map((group,index)=>(
             <Group key={index} group={group} />
            ))
          }
        </div>


    </div>
  )
}

export default GroupChat
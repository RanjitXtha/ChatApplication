import { useState } from 'react';
import axios from '../utils/axios.js';
import { useSelector , useDispatch } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { setCurrentChatUser } from '../utils/currentChat.js';

const Search = () => {
    const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]); 

  const searchUser = async () => {
    if (!search.trim()) return; // avoid empty searches

    try {
      const res = await axios.get(`/chat/users?search=${search}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setResults(res.data.users); 
    } catch (err) {
      console.log(err);
    }
  };


  const addFriend = async (friendId) => {
  try {
    const res = await axios.post(
      `/chat/add-friend`,
      { friendId },
      { withCredentials: true }
    );
    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || 'Error adding friend');
  }
};

  const handleFriend = (user)=>{
    console.log(user)
    console.log("add friend activated")
    addFriend(user._id);
    dispatch(setCurrentChatUser(user));
  }

  return (
    <div className=''>
    <div className="mb-4">
      <div className='relative'>
      <button onClick={searchUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <IoSearchOutline />
        </button>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Space"){
              e.preventDefault();
              searchUser();
            }
          }}
          className="w-full bg-gray-700 border border-gray-600 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
       
       
      </div>
      {results.length > 0 && (
          <ul>
            {results.map((user) => (
              <div onClick={()=>handleFriend(user)}
              key={user._id}
              className={`mx-3 my-1 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-700 
               
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={user.profilePic} alt={user.username} className="w-12 h-12 bg-gray-600 rounded-2xl flex items-center justify-center text-xl">
                    
                  </img>
                
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white truncate">{user.username}</h3>
                  </div>
              
                </div>
              </div>
            </div>
            ))}
          </ul>
      )}
    </div>
  );
};

export default Search;

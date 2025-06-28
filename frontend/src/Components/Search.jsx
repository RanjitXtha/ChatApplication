import { useState } from 'react';
import axios from '../utils/axios.js';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]); // 🆕 Store searched users

  const searchUser = async () => {
    if (!search.trim()) return; // avoid empty searches

    try {
      const res = await axios.get(`/chat/users?search=${search}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setResults(res.data.users); // 🆕 store users in state
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

  const handleFriend = (friendId)=>{
    console.log("add friend activated")
    addFriend(friendId);
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
          className="w-full bg-gray-700 border border-gray-600 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
       
       
      </div>

      {results.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <ul>
            {results.map((user) => (
              <li key={user._id} onClick={()=>handleFriend(user._id)} className="mb-2 flex items-center gap-3">
                <img
                  src={user.profilePic || '/default-avatar.png'}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

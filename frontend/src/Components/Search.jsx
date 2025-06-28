import { useState } from 'react';
import axios from '../utils/axios.js';
import { useSelector } from 'react-redux';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Welcome, {currentUser?.username}</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={searchUser} className="bg-blue-500 text-white px-4 py-2 rounded">
          Find
        </button>
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

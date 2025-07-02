import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiUser, FiMail, FiEdit2, FiLock, FiUploadCloud } from 'react-icons/fi';
import axios from '../utils/axios';
import { setCredentials } from '../utils/authSlice';

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    if (username) data.append('username', username);
    if (password) data.append('password', password);
    if (profilePic) data.append('profilePic', profilePic);

    try {
      const res = await axios.put('/auth/update', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(setCredentials(res.data));
      setMessage('Profile updated successfully!');
      setEditing(false);
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700 text-white">
        <h2 className="text-3xl font-bold mb-6">User Settings</h2>

        {message && (
          <div className="mb-4 text-sm text-center text-red-400">{message}</div>
        )}

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={preview}
            alt={username}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
          />
          {editing && (
            <label className="cursor-pointer text-blue-500 hover:text-blue-400 flex items-center gap-1">
              <FiUploadCloud size={16} />
              <span>Change Picture</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Email (Read-only) */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Email</label>
          <div className="flex items-center gap-2 bg-gray-700 text-gray-400 px-4 py-3 rounded-xl mt-1">
            <FiMail size={18} />
            <span>{user.email}</span>
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Username</label>
          <div className="flex items-center gap-2 mt-1">
            <FiUser size={18} className="text-gray-400" />
            {editing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-white bg-gray-700 px-4 py-2 rounded-xl">{user.username}</span>
            )}
          </div>
        </div>

        {/* Password */}
        {editing && (
          <div className="mb-6">
            <label className="text-sm text-gray-400">New Password</label>
            <div className="flex items-center gap-2 mt-1">
              <FiLock size={18} className="text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setEditing((prev) => !prev)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-1"
          >
            <FiEdit2 size={16} />
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>

          {editing && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-xl text-sm font-medium text-white"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

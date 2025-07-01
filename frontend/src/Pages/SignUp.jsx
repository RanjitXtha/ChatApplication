import React, { useState } from 'react';
import axios from '../utils/axios';

const SignUp= () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    // Optional preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password) {
      setMessage('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('username', formData.username);
    data.append('password', formData.password);
    if (profilePic) data.append('profilePic', profilePic);

    try {
      const res = await axios.post('/auth/signup', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Welcome, ${res.data.username}!`);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Signup failed';
      setMessage(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

      {message && <div className="mb-4 text-center text-red-500">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-full mx-auto"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

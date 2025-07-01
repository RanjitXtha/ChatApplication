// src/pages/Login.jsx
import { useState } from 'react';
import axios from '../utils/axios.js'; 
import { useDispatch } from 'react-redux';
import { setCredentials } from '../utils/authSlice.js';

const Login = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting")
    try {
      const res = await axios.post('/auth/login', form);
      console.log(res.data);
      
      alert('Login successful');
      dispatch(setCredentials(res.data))
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input mb-3"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input mb-3"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

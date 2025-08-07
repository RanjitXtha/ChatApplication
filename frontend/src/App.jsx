import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useEffect } from 'react'
import axios from './utils/axios.js';
import {useDispatch, useSelector} from 'react-redux';
import { setCredentials } from './utils/authSlice.js'
import Profile from './Pages/Profile.jsx'
import PublicRoute from './Components/PublicRoute.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

function App() {
  const dispatch = useDispatch();
 
  useEffect(()=>{

    const getUser = async()=>{
      try{
      const response = await axios.get('/auth/getUser',{
        withCredentials:true
      })

     
      dispatch(setCredentials(response.data))
      
}catch(err){
  console.log(err);
}

    }

  
      getUser()
      
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path="signup" element={<PublicRoute><SignUp /></PublicRoute>}/>
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

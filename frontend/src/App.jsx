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

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=>state.user.currentUser)
  
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
          <Route index element={currentUser?<Home />:<Login/>}/>
          <Route path="login" element={currentUser?<Home />:<Login />}/>
          <Route path="signup" element={currentUser?<Home />:<SignUp />}/>
          <Route path="profile" element={currentUser?<Profile />:<Login />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

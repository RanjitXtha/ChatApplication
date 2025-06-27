import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useEffect } from 'react'
import axios from './utils/axios.js';
import {useDispatch} from 'react-redux';
import { setCredentials } from './utils/authSlice.js'

function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{

    const getUser = async()=>{
      try{
      const response = await axios.get('/auth/getUser',{
        withCredentials:true
      })
      console.log(response.data);
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
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<SignUp />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './utils/authSlice.js'
import currentChatReducer from './utils/currentChat.js'
const store = configureStore({
    reducer:{
        user:authReducer,
        currentChat:currentChatReducer
    }
})

export default store;
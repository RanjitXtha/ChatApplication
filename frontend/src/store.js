import { configureStore } from '@reduxjs/toolkit';
import authReducer from './utils/authSlice.js'
const store = configureStore({
    reducer:{
        user:authReducer,
    }
})

export default store;
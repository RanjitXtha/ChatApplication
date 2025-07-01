import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
    name:"currentChat",
    initialState:{
        currentChatUser:null,
        onlineUsers:[]
    },
    reducers:{
        clearCurrentChatUser: (state)=>{
            state.currentChatUser = null;
        },
        setCurrentChatUser:(state,action)=>{
            state.currentChatUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }

})

export const {setOnlineUsers  , clearCurrentChat , setCurrentChatUser}  = currentChatSlice.actions;
export default currentChatSlice.reducer;

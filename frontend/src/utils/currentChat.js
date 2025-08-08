import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
    name:"currentChat",
    initialState:{
        currentChatUser:null,
        onlineUsers:[],
        currentChatType:null,
        unreadMessages:[]
    },
    reducers:{
        clearCurrentChatUser: (state)=>{
            state.currentChatUser = null;
        },
        setCurrentChatUser:(state,action)=>{
            console.log(action.payload)
            state.currentChatUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setCurrentChatType:(state,action)=>{
            console.log("chatType",action.payload)
            state.currentChatType = action.payload;
        },
        setUnreadMessages:(state,action)=>{
            state.unreadMessages = action.payload;
        }
    }

})

export const {setOnlineUsers,setUnreadMessages , clearCurrentChat ,setCurrentChatType , setCurrentChatUser}  = currentChatSlice.actions;
export default currentChatSlice.reducer;

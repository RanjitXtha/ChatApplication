import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
    name:"currentChat",
    initialState:{
        currentChatUser:null,
    },
    reducers:{
        clearCurrentChatUser: (state)=>{
            state.currentChatUser = null;
        },
        setCurrentChatUser:(state,action)=>{
            state.currentChatUser = action.payload;
        }
    }

})

export const {setCurrentChat  , clearCurrentChat , setCurrentChatUser}  = currentChatSlice.actions;
export default currentChatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
    name:"currentChat",
    initialState:{
        currentChatId:null
    },
    reducers:{
        setCurrentChat : (state,action)=>{
            state.currentChatId = action.payload; 
        },
        clearCurrentChat: (state)=>{
            state.currentChatId = null;
        }
    }

})

export const {setCurrentChat  , clearCurrentChat}  = currentChatSlice.actions;
export default currentChatSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   currentUser:null
}


const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
            state.currentUser = action.payload;
        },
        clearCredentials:(state)=>{
            state.currentUser=null;
        }
    }
})


export const {setCredentials,clearCredentials}= authSlice.actions;
export default authSlice.reducer;
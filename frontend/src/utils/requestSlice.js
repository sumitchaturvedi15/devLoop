import { createSlice } from "@reduxjs/toolkit";

const requestSlice= createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest: (state,action)=>
            action.payload,
        removeRequest: (state,action)=>{
            const newArr= state.filter((r)=>r._id !== action.payload);
            return newArr;
        }
    }
})

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer
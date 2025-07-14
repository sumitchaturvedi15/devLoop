import { createSlice } from "@reduxjs/toolkit";

const requestSlice= createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest: (state,action)=>
            action.payload,
        removeRequest: ()=>null
    }
})

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer
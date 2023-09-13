import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name:'error',
    initialState:{
        status:false,
        errorMessage:'',
        field:'general'
    }, reducers:{
        setError: ( state,action) => {
            debugger
            state.status = true
            state.errorMessage=action.payload.message
            state.field = action.payload.field || 'general'
        },
        unSetError: (state) => {
            state.status = false
            state.errorMessage = ''
        }
    }
})
    export const { setError, unSetError } = errorSlice.actions;

    export default errorSlice.reducer;

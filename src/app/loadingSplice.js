import { createSlice } from "@reduxjs/toolkit";

    const loadingSplice = createSlice({
        name:'loading',
        initialState:{
            value:false
        },
        reducers:{
            startLoading: state =>{
                state.value = true
            },
            stopLoading: state=>{
                state.value = false
            }
        }
    })

        export const { startLoading, stopLoading } = loadingSplice.actions

        export default loadingSplice.reducer 
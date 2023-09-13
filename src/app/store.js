import { configureStore } from "@reduxjs/toolkit";
import loadingSpliceReducer from "./loadingSplice";
import ErrorSplice from "./ErrorSplice";

export default configureStore({
    reducer:{
        loading:loadingSpliceReducer,
        error:ErrorSplice
    }
})
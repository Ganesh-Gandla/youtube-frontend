import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js"
import authReducer from "./authSlice.js";

const store = configureStore({
    reducer:{
        counter: counterReducer,
        auth: authReducer,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";

import  userReducer  from "../features/user/userSlice";
import callApiReducer from "../features/callApi/callApi"

export const store = configureStore({
    reducer: {
        user: userReducer,
        callApi: callApiReducer
    }
})
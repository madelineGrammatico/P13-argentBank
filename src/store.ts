// import { configureStore } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        connected: false,
        token: "",
        id: null
    },
    reducers: {
        // { type: user/connectToggle, 
        // payload: {
        //  name: null, connected: false, id: 0
        //}}
        connectUser: (state, action) => {
            state.connected= !state.connected

        },
        // loginUser:(state, action) => {
        //     state.
        // },
        // signupuser: (state, action) => {

        // },
        // update: (state, action) => {

        // }
    }

})
// const connectUser = () => ({
//     type: "connectUser",
//     preload: {
//         connected: false
//     }
// })

// const userReducer = (state, action) => {
//     if (action.type === "connectUser") {
//         return produce(state, draft => {
//             draft.preload.connected = !draft.preload.connected
//         })
//     }

// }

// initialState = {}
// const store = configureStore({
//     reducer: {
//         user: userReducer,
//     }
// })


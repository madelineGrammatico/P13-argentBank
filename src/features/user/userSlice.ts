import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    connected: false,
    rememberMe: false,
    token: "",
    id: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // modifyEmail:(state, action) => {
        //     state.email = action.payload
        // },
        // modifyPassword:(state, action) => {
        //     state.password = action.payload
        // },
        modifyFistName:(state, action) => {
            state.firstName = action.payload
        },
        modifyLastName:(state, action) => {
            state.lastName = action.payload
        },
        modifyId:(state, action) => {
            state.id = action.payload
        },
        connectedUser: (state, action) => {
            state.connected = action.payload
        },
        rememberMe: (state) => {
            state.rememberMe = true
        },
        disconnectUser: () => {
            return initialState
        }
    }
})


export const { 
    // modifyEmail,
    modifyFistName,
    modifyLastName,
    // modifyPassword,
    modifyId,
    connectedUser,
    rememberMe,
    disconnectUser
} = userSlice.actions;

export default userSlice.reducer
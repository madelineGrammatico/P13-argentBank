import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    connected: false,
    token: "",
    id: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        modifyEmail:(state, action) => {
            state.email = action.payload
        },
        modifyPassword:(state, action) => {
            state.password = action.payload
        },
        modifyFistName:(state, action) => {
            state.firstName = action.payload
        },
        modifyLastName:(state, action) => {
            state.lastName = action.payload
        },
        connectUser: (state, action) => {
            state.connected = true
            // state.token = action.payload.token

        },
        disconnectUser: (state, action) => {
            state = initialState
        }
    }
})


export const { 
    modifyEmail,
    modifyFistName,
    modifyLastName,
    modifyPassword,
    connectUser, 
    disconnectUser
} = userSlice.actions;

export default userSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

 export type User = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    connected: boolean,
    rememberMe: boolean,
    token: string ,
    id: string,
}
const initialState: User = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    connected: false,
    rememberMe: false,
    token: "",
    id: ""
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
    modifyEmail,
    modifyPassword,
    modifyFistName,
    modifyLastName,
    modifyId,
    connectedUser,
    rememberMe,
    disconnectUser
} = userSlice.actions;

export default userSlice.reducer
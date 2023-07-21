import { createSlice } from "@reduxjs/toolkit";

 export type User = {
    email: string,
    firstName: string,
    lastName: string,
    connected: boolean,
    id: string,
}
const initialState: User = {
    email: "",
    firstName: "",
    lastName: "",
    connected: false,
    id: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        modifyEmail:(state, action) => {
            state.email = action.payload
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
        disconnectUser: () => {
            return initialState
        }
    }
})

export const { 
    modifyEmail,
    modifyFistName,
    modifyLastName,
    modifyId,
    connectedUser,
    disconnectUser
} = userSlice.actions;

export default userSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
        modifyEmail:(state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        modifyFistName:(state, action: PayloadAction<string>) => {
            state.firstName = action.payload
        },
        modifyLastName:(state, action: PayloadAction<string>) => {
            state.lastName = action.payload
        },
        modifyId:(state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        connectedUser: (state, action: PayloadAction<boolean>) => {
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
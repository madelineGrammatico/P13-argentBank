import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "void",
    data: null,
    error: null
}

export const callApi = createSlice({
    name: "callApi",
    initialState,
    reducers: {
        fetching: (state, action) => {
            if (state.status === 'void'){
                state.status = "pending"
                return 
            }
            if (state.status === 'rejected'){
                state.status = "pending"
                state.error = null
                return
            }
            if (state.status === 'resolved'){
                state.status = "updating"
                return
            }
            
        },
        resolved: (state, action) => {
            if (state.status === 'pending' || state.status === 'updating'){
                state.data = action.payload
                state.status = "resolved"
                return
            }

        },
        rejected: (state, action) => {
            if (state.status === 'pending' || state.status === 'updating'){
                state.error = action.payload
                state.data = null
                state.status = "rejected"
                return
            }
        }
    }
})

export const {
    fetching,
    resolved,
    rejected
} = callApi.actions

export default callApi.reducer
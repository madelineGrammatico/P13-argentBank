// import { configureStore } from "@reduxjs/toolkit"
import produce from "immer"

const connectUser = () => ({
    type: "connectUser",
    preload: {
        connected: false
    }
})

const userReducer = (state, action) => {
    if (action.type === "connectUser") {
        return produce(state, draft => {
            draft.preload.connected = !draft.preload.connected
        })
    }

}

initialState = {}
// const store = configureStore({
//     reducer: {
//         user: userReducer,
//     }
// })


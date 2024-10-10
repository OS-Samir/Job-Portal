import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const useSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null
    },
    reducers: {
        registerRequest(state, action){
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null,
            state.message = null
        },
        registerSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null,
            state.message = action.payload.message;
        },
        registerFailed(state, action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload,
            state.message = null;
        },
        clearAllError(state, action) {
            state.error = null;
            state.user = state.user;
        },
        
    }
})
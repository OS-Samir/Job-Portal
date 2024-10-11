import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"


const userSlice = createSlice({
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
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        registerFailed(state, action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.message = null;
        },
        clearAllError(state, action) {
            state.error = null;
            state.user = state.user;
        },
        
    },

})

export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/register", data,{
            withCredentials: true,
            headers: {"Content-Type": "multipart/form-data"}
            
            
        } );
        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearAllError());
    } catch (error) {
        dispatch(userSlice.actions.registerError(error.response.data.message));
    }
};

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}   

export default userSlice.reducer;
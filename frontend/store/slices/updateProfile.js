import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
        error: null,
        isUpdated: false
    },
    reducers: {
       updateProfileRequest(state, action) {},
       updateProfileSuccess(state, action) {},
       updateProfileFailed(state, action) {},
       updatePasswordRequest(state, action) {},
       updatePasswordSuccess(state, action) {},
       updatePasswordFailed(state, action) {},
       profileResetAfterUpdate(state, action) {},

    }
})
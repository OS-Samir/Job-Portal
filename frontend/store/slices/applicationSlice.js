import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,
        myApplications: []
    },
    reducers: {
        requestForAllApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForAllApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForAllApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestForMyApplications(state, action) {
            state.loading = true;
            state.error = null;
        },
        successForMyApplications(state, action) {
            state.loading = false;
            state.error = null;
            state.applications = action.payload;
        },
        failureForMyApplications(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        requestForPostApplication(state, action) {
                state.loading = true;
                state.error = null;
                state.message = null;
        },
        successForPostApplication(state, action) {
                state.loading = false;
                state.error = null;
                state.message = action.payload;
        },        
        failureForPostApplication(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.myApplications = state.myApplications;
        },
        resetApplicationSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.myApplications = state.myApplications;
            state.message = null;
            state.loading = false;

        }
 
    }
})

export const postApplication = (data, jobId) => async(dispatch) => {

}
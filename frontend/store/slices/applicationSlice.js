
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "applications",
    initialState: {
        applications: [],
        loading: false,
        error: null,
        message: null,
        // myApplications: []
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
            // state.myApplications = state.myApplications;
        },
        resetApplicationSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            // state.myApplications = state.myApplications;
            state.message = null;
            state.loading = false;

        }
 
    }
});

export const fetchEmployerApplications = () => async(dispatch) => {
    dispatch(applicationSlice.actions.requestForAllApplications());
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/application/employer/getall`,
                {
                    withCredentials: true,

                }
            );
            dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
            dispatch(applicationSlice.actions.clearAllErrors());
        }
        catch (error) {
            dispatch (applicationSlice.actions.failureForAllApplications(error.response.data.message));
        }
}

export const fetchJobSeekerApplications = () => async(dispatch) => {
    dispatch(applicationSlice.actions.requestForMyApplications());
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/application/jobseeker/getall`,
                {
                    withCredentials: true,

                }
            );
            dispatch(applicationSlice.actions.successForMyApplications(response.data.applications));
            dispatch(applicationSlice.actions.clearAllErrors());
        }
        catch (error) {
            dispatch (applicationSlice.actions.failureForMyApplications(error.response.data.message));
        }
}



export const postApplication = (data, jobId) => async(dispatch) => {
        dispatch(applicationSlice.actions.requestForPostApplication());
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/application/post/${jobId}`, data,
                {
                    withCredentials: true,
                    headers: {"Content-Type": "multipart/form-data"},
                }
            );
            dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
            dispatch(applicationSlice.actions.clearAllErrors());
        }
        catch (error) {
            dispatch (applicationSlice.actions.failureForPostApplication(error.response.data.message));
        }
}

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
}   

export const resetApplicationSlice = () => () => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
}


export default applicationSlice.reducer;

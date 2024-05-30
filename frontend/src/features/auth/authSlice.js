import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/login`, { email, password });
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Return a specific error message if the server responded with an error
                return rejectWithValue(error.response.data.message);
            } else {
                // Return a generic error message
                return rejectWithValue(error.message);
            }
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ username, email, password, mobileNo }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/register`, { username, email, password, mobileNo });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                // Return a specific error message if the server responded with an error
                return rejectWithValue(error.response.data.message);
            } else {
                // Return a generic error message
                return rejectWithValue(error.message);
            }
        }
    }
);

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default authSlice.reducer;

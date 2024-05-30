import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/login`,data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        authError: null,
        authLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.authLoading = true;
                state.authError = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.authError = null;
            })

            .addCase(login.rejected, (state, action) => {
                state.authError = action.payload;
            });
    },
});

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthError = (state) => state.auth.authError;

export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvents = createAsyncThunk('events/getEvents', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_EVENTS_URL}/get`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const createEvent = createAsyncThunk('events/createEvent', async (event) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_EVENTS_URL}/create`, event,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        eventsError: null,
        eventsLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state, action) => {
                state.eventsLoading = true;
                state.eventsError = null;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.events = action.payload;
                state.eventsError = null;
                state.eventsLoading = false;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.eventsError = action.payload;
                state.eventsLoading = false;
            })

            .addCase(createEvent.pending, (state, action) => {
                state.eventsLoading = true;
                state.eventsError = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
                state.eventsError = null;
                state.eventsLoading = false;
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.eventsError = action.payload;
                state.eventsLoading = false;
            });
    },
});

export const selectEvents = (state) => state.events.events;
export const selectEventsLoading = (state) => state.events.eventsLoading;
export const selectEventsError = (state) => state.events.eventsError;

export default eventsSlice.reducer;

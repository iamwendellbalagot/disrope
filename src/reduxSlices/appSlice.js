import {createSlice} from '@reduxjs/toolkit';

const appSLice = createSlice({
    name: 'app',
    initialState: {
        server: null,
        channel: null,
        channels: []
    },
    reducers: {
        setServer: (state,action) => {
            state.server = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        }
    }
})

export const {setServer, setChannel, setChannels} = appSLice.actions;
export const getServer = (state) => state.app.server;
export const getChannel = (state) => state.app.channel;
export const getChannels = (state) => state.app.channels;

export default appSLice.reducer;
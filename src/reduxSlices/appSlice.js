import {createSlice} from '@reduxjs/toolkit';

const appSLice = createSlice({
    name: 'app',
    initialState: {
        server: null,
        channel: null
    },
    reducers: {
        setServer: (state,action) => {
            state.server = action.payload;
        },
        setChannel: (state, action) => {
            state.channel = action.payload;
        }
    }
})

export const {setServer, setChannel} = appSLice.actions;
export const getServer = (state) => state.app.server;
export const getChannel = (state) => state.app.channel;

export default appSLice.reducer;
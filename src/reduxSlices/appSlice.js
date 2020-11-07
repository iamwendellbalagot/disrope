import {createSlice} from '@reduxjs/toolkit';

const appSLice = createSlice({
    name: 'app',
    initialState: {
        server: null
    },
    reducers: {
        setServer: (state,action) => {
            state.server = action.payload
        }
    }
})

export const {setServer} = appSLice.actions;
export const getServer = (state) => state.app.server;

export default appSLice.reducer;
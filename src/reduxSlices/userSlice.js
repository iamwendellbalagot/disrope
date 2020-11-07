import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        servers: []
    },
    reducers: {
        login: (state, action) =>{
            state.user = action.payload;
        },
        servers: (state, action) => {
            const sortObject = (a, b) => {
                if (a.data.timestamp > b.data.timestamp){
                    return 1
                }else{
                    return -1
                }
            }
            state.servers = action.payload.sort(sortObject);
        },
        logout: (state, action) =>{
            state.user = null;
        }
    }
})

export const {login, logout, servers} = userSlice.actions;
export const getUser = (state) => state.user.user;
export const getServers = (state) => state.user.servers;
export default userSlice.reducer;
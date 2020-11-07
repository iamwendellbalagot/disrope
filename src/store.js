import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './reduxSlices/userSlice';
import appReducer from './reduxSlices/appSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        app: appReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})
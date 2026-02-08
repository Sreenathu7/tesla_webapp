import { configureStore } from '@reduxjs/toolkit';
import carReducer from './slices/carSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        cars: carReducer,
        auth: authReducer,
    },
});

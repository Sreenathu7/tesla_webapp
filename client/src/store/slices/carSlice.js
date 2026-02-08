import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { carAPI } from '../../services/api';

export const fetchCars = createAsyncThunk('cars/fetchAll', async (params) => {
    const response = await carAPI.getAll(params);
    return response.data;
});

export const fetchCarBySlug = createAsyncThunk('cars/fetchBySlug', async (slug) => {
    const response = await carAPI.getBySlug(slug);
    return response.data;
});

const carSlice = createSlice({
    name: 'cars',
    initialState: {
        cars: [],
        meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0
        },
        selectedCar: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedCar: (state) => {
            state.selectedCar = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.cars = action.payload.cars;
                state.meta = action.payload.meta;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCarBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedCar = null;
            })
            .addCase(fetchCarBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCar = action.payload;
            })
            .addCase(fetchCarBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedCar } = carSlice.actions;
export default carSlice.reducer;

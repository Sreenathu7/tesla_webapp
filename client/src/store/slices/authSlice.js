import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const response = await authAPI.login(credentials);
    return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
    const response = await authAPI.register(userData);
    return response.data;
});

export const restoreUser = createAsyncThunk('auth/restore', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('No token found');
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            user: {
                id: payload.id || payload.userId,
                email: payload.email,
                name: payload.name,
                role: payload.role || 'USER'
            },
            token
        };
    } catch (error) {
        localStorage.removeItem('token');
        return rejectWithValue('Invalid token');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token'),
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => [loginUser.pending, registerUser.pending, restoreUser.pending].includes(action.type),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => [loginUser.fulfilled, registerUser.fulfilled, restoreUser.fulfilled].includes(action.type),
                (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    if (action.type !== restoreUser.fulfilled.type) {
                        localStorage.setItem('token', action.payload.token);
                    }
                }
            )
            .addMatcher(
                (action) => [loginUser.rejected, registerUser.rejected].includes(action.type),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'Authentication failed';
                }
            )
            .addMatcher(
                (action) => action.type === restoreUser.rejected.type,
                (state) => {
                    state.loading = false;
                    state.user = null;
                    state.token = null;
                }
            );
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

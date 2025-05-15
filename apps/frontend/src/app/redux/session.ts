import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SafeUser } from '@aa-mono-repo/common';
import { API } from '../lib/api/api';
import { DataState } from '../lib/interfaces/data.state';
import { DataStateErrors } from '../lib/interfaces/data.state.errors';

export interface UserCredentials {
    username: string;
    password: string;
}

export interface UserCredentialsErrors extends DataStateErrors {
    username?: string;
    password?: string;
}

export interface UserCredentialsState extends DataState<SafeUser> {
    errors: UserCredentialsErrors;
}

export interface SessionState {
    user: UserCredentialsState;
}

export const restore = createAsyncThunk<SafeUser, void, { rejectValue: UserCredentialsErrors }>(
    'session/user',
    async (_, api) => {
        try {
            return await API.getRequest<SafeUser>('/session');
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
    },
);

export const login = createAsyncThunk<
    SafeUser,
    UserCredentials,
    { rejectValue: UserCredentialsErrors }
>('session/login', async ({ username, password }, api) => {
    try {
        return await API.postRequest<SafeUser>('/session', { username, password });
    } catch (error) {
        return API.error(error, api.rejectWithValue);
    }
});

export const logout = createAsyncThunk<void, void, { rejectValue: UserCredentialsErrors }>(
    'session/logout',
    async (_, api) => {
        try {
            await API.deleteRequest<SafeUser>('/session');

            return;
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
    },
);

// Initial state
const initialState: SessionState = {
    user: {
        status: 'idle',
        data: null,
        errors: {},
    },
};

// Slice of state
export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        updateErrors: (state, action: PayloadAction<UserCredentialsErrors>) => {
            state.user.errors = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            // Restore
            .addCase(restore.pending, (state) => {
                state.user.status = 'loading';
                state.user.data = null;
                state.user.errors = {};
            })
            .addCase(restore.fulfilled, (state, action) => {
                state.user.status = 'success';
                state.user.data = action.payload;
                state.user.errors = {};
            })
            .addCase(restore.rejected, (state) => {
                state.user.status = 'failed';
                state.user.data = null;
                state.user.errors = {};
            })

            // Login
            .addCase(login.pending, (state) => {
                state.user.status = 'loading';
                state.user.data = null;
                state.user.errors = {};
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user.status = 'success';
                state.user.data = action.payload;
                state.user.errors = {};
            })
            .addCase(login.rejected, (state, action) => {
                state.user.status = 'failed';
                state.user.data = null;
                state.user.errors = action.payload ?? {};
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.user.status = 'loading';
                state.user.data = null;
                state.user.errors = {};
            })
            .addCase(logout.fulfilled, (state) => {
                state.user.status = 'success';
                state.user.data = null;
                state.user.errors = {};
            })
            .addCase(logout.rejected, (state, action) => {
                state.user.status = 'failed';
                state.user.data = null;
                state.user.errors = action.payload ?? {};
            }),
});

// Action creators are generated for each case reducer function
export const { updateErrors } = sessionSlice.actions;

// Export reducer
export default sessionSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../lib/api/api';
import { DataStateErrors } from '../lib/interfaces/data.state.errors';
import { DataState } from '../lib/interfaces/data.state';
import { SafeUser } from '@aa-mono-repo/common';

export interface UserSignup {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
}

export interface UserSignupErrors extends DataStateErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    password_confirmation?: string;
}

export interface UserSignupState extends DataState<SafeUser> {
    errors: UserSignupErrors;
}

export interface SignupState {
    user: UserSignupState;
}

export const signup = createAsyncThunk<SafeUser, UserSignup, { rejectValue: UserSignupErrors }>(
    'signup/signup',
    async (user, api) => {
        try {
            return await API.postRequest<SafeUser>('/signup', user);
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
    },
);

// Initial state
const initialState: SignupState = {
    user: {
        status: 'idle',
        data: null,
        errors: {},
    },
};

// Slice of state
export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        updateErrors: (state, action: PayloadAction<UserSignupErrors>) => {
            state.user.errors = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            // Signup
            .addCase(signup.pending, (state) => {
                state.user.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<SafeUser>) => {
                state.user.status = 'success';
                state.user.data = action.payload;
                state.user.errors = {};
            })
            .addCase(signup.rejected, (state, action) => {
                state.user.status = 'failed';
                state.user.errors = action.payload ?? {};
            }),
});

// Action creators are generated for each case reducer function
export const { updateErrors } = signupSlice.actions;

// Export reducer
export default signupSlice.reducer;

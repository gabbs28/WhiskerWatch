import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../lib/api/api';
import { DataState } from '../lib/interfaces/data.state';
import { DataStateErrors } from '../lib/interfaces/data.state.errors';
import { petsModel } from '../../database/models';

export interface SessionState {
    pet: DataState<petsModel>;
    pets: DataState<petsModel[]>;
}

export const getAllPets = createAsyncThunk<petsModel[], void, { rejectValue: DataStateErrors }>(
    'pets/getAllPets',
    async (_, api) => {
        try {
            return await API.getRequest<petsModel[]>('/api/pets');
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
    },
);

export const getPetByID = createAsyncThunk<
    petsModel,
    { id: number },
    { rejectValue: DataStateErrors }
>('pets/getPetByID', async ({ id }, api) => {
    try {
        return await API.getRequest<petsModel>(`/api/pets/${id}`);
    } catch (error) {
        return API.error(error, api.rejectWithValue);
    }
});

// Initial state
const initialState: SessionState = {
    pets: {
        status: 'idle',
        data: [],
        errors: {},
    },
    pet: {
        status: 'idle',
        data: null,
        errors: {},
    },
};

// Slice of state
export const petSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        updatePetErrors: (state, action: PayloadAction<DataStateErrors>) => {
            state.pet.errors = action.payload;
        },
        updatePetsErrors: (state, action: PayloadAction<DataStateErrors>) => {
            state.pets.errors = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            // Restore
            .addCase(getAllPets.pending, (state) => {
                state.pets.status = 'loading';
                state.pets.data = null;
                state.pets.errors = {};
            })
            .addCase(getAllPets.fulfilled, (state, action) => {
                state.pets.status = 'success';
                state.pets.data = action.payload;
                state.pets.errors = {};
            })
            .addCase(getAllPets.rejected, (state) => {
                state.pets.status = 'failed';
                state.pets.data = null;
                state.pets.errors = {};
            })

            // Login
            .addCase(getPetByID.pending, (state) => {
                state.pet.status = 'loading';
                state.pet.data = null;
                state.pet.errors = {};
            })
            .addCase(getPetByID.fulfilled, (state, action) => {
                state.pet.status = 'success';
                state.pet.data = action.payload;
                state.pet.errors = {};
            })
            .addCase(getPetByID.rejected, (state, action) => {
                state.pet.status = 'failed';
                state.pet.data = null;
                state.pet.errors = action.payload ?? {};
            }),
});

// Action creators are generated for each case reducer function
export const { updatePetErrors, updatePetsErrors } = petSlice.actions;

// Export reducer
export default petSlice.reducer;

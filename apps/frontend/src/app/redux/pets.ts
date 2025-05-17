import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../lib/api/api';
import { DataState } from '../lib/interfaces/data.state';
import { DataStateErrors } from '../lib/interfaces/data.state.errors';
import {breed_type, color_type, fur_pattern_type, gender_type, hair_length_type} from '@aa-mono-repo/prisma-client';


export interface Pet {
    id: number;
    name: string;
    breed: breed_type;
    birthday: Date;
    gender: gender_type;
    sterilized: boolean;
    weight: number;
    color: color_type;
    hair_length: hair_length_type;
    fur_pattern: fur_pattern_type;
    allergies: string[];
    microchip: number;
    medical_condition: string[];
    created_at: Date;
    updated_at: Date;
}

export interface GetPet {
    id: number;
}

export interface PetsState {
    pets: DataState<Pet[]>;
    pet: DataState<Pet>;
}

export const pets = createAsyncThunk<Pet[], void, { rejectValue: DataStateErrors }>(
    'pets/all',
    async (_, api) => {
        try {
            return await API.getRequest<Pet[]>('/api/pets');
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
    },
);

export const pet = createAsyncThunk<Pet, GetPet, { rejectValue: DataStateErrors }>(
    //action name
    'pets/pet', 
    async ({ id }, api) => {
        try {
            //api call
            return await API.getRequest<Pet>(`/api/pets/${id}`);
        } catch (error) {
            return API.error(error, api.rejectWithValue);
        }
});

// Initial state
// Structure of this slice of state will look like
const initialState: PetsState = {
    pets: {
        status: 'idle',
        data: null,
        errors: {},
    },
    pet: {
        status: 'idle',
        data: null,
        errors: {},
    }
};

// Slice of state
export const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>
        builder
            // Pets
            .addCase(pets.pending, (state) => {
                state.pets.status = 'loading';
                state.pets.data = null;
                state.pets.errors = {};
            })
            .addCase(pets.fulfilled, (state, action) => {
                state.pets.status = 'success';
                state.pets.data = action.payload;
                state.pets.errors = {};
            })
            .addCase(pets.rejected, (state) => {
                state.pets.status = 'failed';
                state.pets.data = null;
                state.pets.errors = {};
            })

            // Pet
            .addCase(pet.pending, (state) => {
                state.pet.status = 'loading';
                state.pet.data = null;
                state.pet.errors = {};
            })
            .addCase(pet.fulfilled, (state, action) => {
                state.pet.status = 'success';
                state.pet.data = action.payload;
                state.pet.errors = {};
            })
            .addCase(pet.rejected, (state, action) => {
                state.pet.status = 'failed';
                state.pet.data = null;
                state.pet.errors = action.payload ?? {};
            })

});

// Action creators are generated for each case reducer function
export const {} = petsSlice.actions;

// Export reducer
export default petsSlice.reducer;

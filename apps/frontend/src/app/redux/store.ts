import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from './session';
import logger from 'redux-logger';
import { IS_DEVELOPMENT } from '../config/environment.config';
import { signupSlice } from './signup';

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        signup: signupSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        if (IS_DEVELOPMENT) {
            return getDefaultMiddleware().concat(logger);
        }

        return getDefaultMiddleware();
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {session: SessionState}
export type AppDispatch = typeof store.dispatch;

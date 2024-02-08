import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './src/feature/eventSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

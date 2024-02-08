import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './src/feature/eventSlice';

export const store = configureStore({
  reducer: {
    event: eventReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

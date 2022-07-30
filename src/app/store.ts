import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";

export const store = configureStore({
  reducer: {
    
    auth: authReducer,
    event: eventReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AddDispatch = typeof store.dispatch;


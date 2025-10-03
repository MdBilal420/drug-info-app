import { configureStore } from '@reduxjs/toolkit';
import drugReducer from './drugSlice';

export const store = configureStore({
  reducer: {
    drugs: drugReducer,
  },
});

export default store;
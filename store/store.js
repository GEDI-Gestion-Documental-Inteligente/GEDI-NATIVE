import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import siteReducer from '../features/siteSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice'
import siteReducer from '../reducers/siteSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer
  },
});

export default store;

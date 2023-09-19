import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authLogin/authSlice'
import siteReducer from './sites/siteSlice';
import nodeReducer from './nodes/nodeSlice'
import peopleReducer from './people/peopleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer,
    nodes: nodeReducer,
    peoples : peopleReducer
  },
});

export default store;

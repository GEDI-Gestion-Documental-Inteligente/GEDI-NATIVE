import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice'
import siteReducer from '../reducers/siteSlice';
import nodeReducer from '../reducers/nodeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer,
    nodes: nodeReducer,
  },
});

export default store;

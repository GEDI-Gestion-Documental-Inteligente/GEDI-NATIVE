import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/authLogin/authSlice.js';
import siteReducer from './modules/sites/siteSlice.js';
import nodeReducer from './modules/nodes/nodeSlice.js';
import peopleReducer from './modules/people/peopleSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer,
    nodes: nodeReducer,
    peoples : peopleReducer
  },
});

export default store;

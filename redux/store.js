import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/authLogin/authSlice';
import siteReducer from './modules/sites/siteSlice';
import nodeReducer from './modules/nodes/nodeSlice';
import peopleReducer from './modules/people/peopleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    sites : siteReducer,
    nodes: nodeReducer,
    peoples : peopleReducer
  },
});

export default store;

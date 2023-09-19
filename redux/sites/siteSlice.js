import { createSlice } from '@reduxjs/toolkit';
import { getMySites } from './SitesThunks';

const siteSlice = createSlice({
  name: 'sites',
  initialState: {
    sites: [],
    loading: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMySites.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getMySites.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.sites = action.payload;
    });
    builder.addCase(getMySites.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export default siteSlice.reducer;

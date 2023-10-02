import { createSlice } from '@reduxjs/toolkit';
import { getContainerDocumentLibrary, getMySites } from './SitesThunks';

const siteSlice = createSlice({
  name: 'sites',
  initialState: {
    sites: [],
    loading: 'idle',
    containerDL:""
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
    builder.addCase(getContainerDocumentLibrary.pending, (state)=> {
      state.loading = 'pending'
    });
    builder.addCase(getContainerDocumentLibrary.fulfilled, (state, action) =>{
      state.loading = 'success'
      state.containerDL= action.payload
    })
  },
});

export default siteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  createSite,
  getContainerDocumentLibrary,
  getMySites,
  getSiteActivities,
  getSiteMembers,
  searchSiteFormTerm,
} from "./SitesThunks";

const siteSlice = createSlice({
  name: "sites",
  initialState: {
    sites: [],
    loading: "idle",
    containerDL: "",
    resultSearch: [],
    siteActivities: [],
    siteMembers:[]
  },
  reducers: {
    clearSearch: state => {
      state.resultSearch = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMySites.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMySites.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.sites = action.payload;
    });
    builder.addCase(getMySites.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(getContainerDocumentLibrary.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getContainerDocumentLibrary.fulfilled, (state, action) => {
      state.loading = "success";
      state.containerDL = action.payload;
    });
    builder.addCase(createSite.fulfilled, (state, action) => {
      state.loading = "success";
    });
    builder.addCase(searchSiteFormTerm.fulfilled, (state, action)=>{
      state.resultSearch = action.payload
    });
    builder.addCase(searchSiteFormTerm.rejected, (state)=>{
      state.resultSearch = []
    });
    builder.addCase(getSiteActivities.fulfilled, (state, action) => {
      state.siteActivities = action.payload
    })
    builder.addCase(getSiteMembers.fulfilled, (state, action) =>{
      state.siteMembers = action.payload
    })
  },
});

export default siteSlice.reducer;
export const { clearSearch } = siteSlice.actions;

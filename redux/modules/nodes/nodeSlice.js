import { createSlice } from "@reduxjs/toolkit";
import { SearchNodesForTerm, fetchContentNode, getNodes } from "./NodeThunks";

const initialState = {
  nodes: [],
  nodesMongo:[],
  rootId:'',
  loading: "idle",
  searchNodes: []
};

const nodeSlice = createSlice({
  name: "nodes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNodes.pending, (state) => {
      state.pending = "loading";
    });
    builder.addCase(getNodes.fulfilled, (state, action) => {
      state.pending = "success";
      state.nodes = action.payload.nodes.list.entries;
      state.nodesMongo= action.payload.nodesMongo
    });
    builder.addCase(getNodes.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchContentNode.fulfilled, (state, action) => {
      state.buffer = action.payload;
    });
    builder.addCase(SearchNodesForTerm.fulfilled, (state, action) => {
      state.searchNodes = action.payload;
    });
  },
});

export default nodeSlice.reducer;

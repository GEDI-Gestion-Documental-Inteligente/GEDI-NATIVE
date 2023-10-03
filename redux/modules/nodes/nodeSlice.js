import { createSlice } from "@reduxjs/toolkit";
import { fetchContentNode, getNodes } from "./NodeThunks";

const initialState = {
  nodes: [],
  loading: "idle",
  buffer: [],
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
      state.nodes = action.payload;
    });
    builder.addCase(getNodes.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchContentNode.fulfilled, (state, action) => {
      state.buffer = action.payload;
    });
  },
});

export default nodeSlice.reducer;

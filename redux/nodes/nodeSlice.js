import { createSlice } from "@reduxjs/toolkit";
import { getNodes } from "../services/NodeThunks";

const initialState = {
  nodes: [],
  loading: "idle",
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
  },
});


export default nodeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunks";

const initialState = {
  requestUser: [],
  responseAi: [],
  loading: "idle",
  ticket: "",
};
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    requestUser: [],
    responseAi: [],
    loading: "idle",
    ticket: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = "success";
      state.responseAi.push(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.loading = "reject";
    });
  },
});

export default chatSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunks";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [{ text: "hola", sender: "user" }],
    loading: "idle",
    response: null,
  },
  reducers: {
    clearResponse: (state) => {
      state.response = null;
    },
    addMessageUser: (state, action) => {
      state.messages.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.messages.push({ text: action.payload, sender: "bot" });
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { clearResponse, addMessageUser } = chatSlice.actions;
export default chatSlice.reducer;

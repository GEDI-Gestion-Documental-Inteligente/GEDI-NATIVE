import { createSlice } from "@reduxjs/toolkit";
import { loginAndFetchTicket, logoutAndClearTicket } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: "",
    ticket: "",
    loading: "idle",
  },
  reducers: {
    clearTicket: (state) => {
      state.ticket = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAndFetchTicket.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loginAndFetchTicket.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = "succeeded";
        state.isAuthenticated = true;
        state.ticket = action.payload.token;
        state.user = action.payload.userId;
      }
    });
    builder.addCase(loginAndFetchTicket.rejected, (state) => {
      state.loading = "failed";
      state.isAuthenticated = false;
    });
    builder.addCase(logoutAndClearTicket.fulfilled, (state) => {
      state.ticket = "";
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;

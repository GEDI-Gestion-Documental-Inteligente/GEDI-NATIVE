import { createSlice } from '@reduxjs/toolkit';
import { loginAndFetchTicket, logoutAndClearTicket } from '../services/authThunks';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    ticket: '',
    loading: 'idle'
  },
  reducers: {
    clearTicket: state => {
      state.ticket = '';
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAndFetchTicket.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(loginAndFetchTicket.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.isAuthenticated = true;
      state.ticket = action.payload;
    });
    builder.addCase(loginAndFetchTicket.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(logoutAndClearTicket.fulfilled, (state) => {
      state.ticket = '';
      state.isAuthenticated = false;
    });
  },
});

export const selectIsAuthenticated = state => state.auth.isAuthenticated;

export default authSlice.reducer;

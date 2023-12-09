import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAndFetchTicket = createAsyncThunk(
  "auth/loginAndFetchTicket",
  async ({ userId, password }) => {
    try {
      const url_base = process.env.EXPO_PUBLIC_API_URL;
      const data = {
        userId,
        password,
      };
      const response = await axios.post(`${url_base}/auth`, data);
      const dataLoggued = response.data;
      if(dataLoggued.ok){
        return dataLoggued;
      }else{
        return;
      }
      
    } catch (error) {
      return;
    }
  }
);

export const logoutAndClearTicket = createAsyncThunk(
  "auth/logoutAndClearTicket",
  async (ticket, thunkAPI) => {
    try {
      const response = await axios.get()
      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }


      thunkAPI.dispatch(authSlice.actions.clearTicket());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

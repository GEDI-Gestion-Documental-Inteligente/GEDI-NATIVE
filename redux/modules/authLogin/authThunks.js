import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
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

      if (!response.data.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const ticket = response.data.token;
      // Guardar el ticket en AsyncStorage
      await AsyncStorage.setItem("ticket", ticket);

      return ticket;
    } catch (error) {
      console.error("aaaa", error);
      throw error;
    }
  }
);

export const logoutAndClearTicket = createAsyncThunk(
  "auth/logoutAndClearTicket",
  async (ticket, thunkAPI) => {
    try {
      const response = await fetch(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets/${ticket}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      // Limpiar el ticket en AsyncStorage
      await AsyncStorage.removeItem("ticket");

      thunkAPI.dispatch(authSlice.actions.clearTicket());
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

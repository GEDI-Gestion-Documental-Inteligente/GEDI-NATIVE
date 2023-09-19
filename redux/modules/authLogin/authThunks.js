import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage


export const loginAndFetchTicket = createAsyncThunk(
  "auth/loginAndFetchTicket",
  async ({ userId, password }) => {
    try {
      const url_base = process.env.URL_BASE
      const response = await fetch(`${url_base}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
        credentials: "include", // Habilita el envío de cookies con cada solicitud
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const ticket = response.headers.get("set-cookie");
      console.log("Cookies recibidas:", ticket);
      
      // Guardar el ticket en AsyncStorage
      await AsyncStorage.setItem("ticket", ticket);

      return ticket;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const logoutAndClearTicket = createAsyncThunk(
  "auth/logoutAndClearTicket",
  async (ticket, thunkAPI) => {
    try {
      const response = await fetch(`http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets/${ticket}`, {
        method: "DELETE",
      });

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

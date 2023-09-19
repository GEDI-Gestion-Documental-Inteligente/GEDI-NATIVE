import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMySites = createAsyncThunk(
  "sites/getMySites",
  async () => {
    try {
      const ticket = await AsyncStorage.getItem('ticket'); // Obtener el ticket desde AsyncStorage

      if (!ticket) {
        throw new Error('Ticket no encontrado'); // Manejar caso donde no haya ticket
      }
      const url_base = process.env.URL_BASE
      const myheaders = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + ticket
        }
      }
   
      const response = await axios.get(`${url_base}/sites`, myheaders);

      return response.data.list.entries;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
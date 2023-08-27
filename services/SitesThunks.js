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

      const myheaders = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + ticket
        }
      }
      const IPV4_ADDRESS = "192.168.1.20"
      const response = await axios.get(`http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/sites`, myheaders);

      return response.data.list.entries;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
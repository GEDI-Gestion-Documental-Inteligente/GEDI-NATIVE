import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { encode } from 'base-64';
import { IPV4_ADDRESS } from './SitesThunks';

export const loginAndFetchTicket = createAsyncThunk(
  'auth/loginAndFetchTicket',
  async ({ userId, password }) => {
    try {
    
      const response = await axios.post(
        `http:${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets`,
        {
          userId,
          password
        }
      );

      
      const ticket = response.data.entry.id;
      const base64Ticket = encode(ticket);

      // Guardar el ticket en AsyncStorage
      await AsyncStorage.setItem('ticket', base64Ticket.toString());

      

      return base64Ticket;
    } catch (error) {
        console.log(error)
      throw new Error('Error al iniciar sesión');
    }
  }
);

export const logoutAndClearTicket = createAsyncThunk(
  'auth/logoutAndClearTicket',
  async (ticket, thunkAPI) => {
    try {
      await axios.delete(
        `http://192.168.137.1:8080/alfresco/api/-default-/public/authentication/versions/1/tickets/${ticket}`
      );

      // Limpiar el ticket en AsyncStorage
      await AsyncStorage.removeItem('ticket');

      thunkAPI.dispatch(authSlice.actions.clearTicket());
    } catch (error) {
      throw new Error('Error al cerrar sesión');
    }
  }
);

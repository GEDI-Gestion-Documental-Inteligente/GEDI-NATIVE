import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNodes = createAsyncThunk(
  "nodes/getNodes",
  async ({ id, ticket }) => {
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + ticket,
      },
    };
    try {
      const response = await axios.get(`${url_base}/nodes`, myheaders);
      return response.data.list.entries;
    } catch (error) {
      console.log(error);
      throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
    }
  }
);

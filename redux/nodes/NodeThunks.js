import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPV4_ADDRESS } from "./SitesThunks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";

export const getNodes = createAsyncThunk('nodes/getNodes', async ({id, ticket}) => {
console.log(ticket)
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + ticket,
      },
    };
    try {
      const response = await axios.get(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
        myheaders
      );
      return response.data.list.entries;
    } catch (error) {
      console.log(error);
      throw error; // Asegúrate de propagar el error para que el slice pueda manejarlo
    }
  });
  
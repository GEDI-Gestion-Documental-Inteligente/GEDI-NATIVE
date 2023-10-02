import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMySites = createAsyncThunk("sites/getMySites", async () => {
  try {
    const ticket = await AsyncStorage.getItem("ticket"); // Obtener el ticket desde AsyncStorage
    if (!ticket) {
      throw new Error("Ticket no encontrado"); // Manejar caso donde no haya ticket
    }
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    

    const response = await axios.get(`${url_base}/sites/all`, myheaders);
    const listSites = response.data.sites.list.entries
    return listSites;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
});

export const getContainerDocumentLibrary = createAsyncThunk("sites/getDocumentLibrary", async(siteName) =>{
  try {
    const ticket =  await AsyncStorage.getItem("ticket"); // Obtener el ticket desde AsyncStorage
    if (!ticket) {
      throw new Error("Ticket no encontrado"); // Manejar caso donde no haya ticket
    }
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    const response = await axios.get(`${url_base}/sites/getContainerSite/${siteName}`, myheaders);
    const documentLibrary = await response.data.containerDocumentLibrary.entry.id
    console.log("DL", documentLibrary)
    if(!documentLibrary){
      return null;
    }
    return documentLibrary;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
})

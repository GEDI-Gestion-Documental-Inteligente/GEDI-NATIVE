import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = process.env.EXPO_PUBLIC_API_URL;
export const getMySites = createAsyncThunk(
  "sites/getMySites",
  async ({ ticket }) => {
    try {
      if (!ticket) {
        throw new Error("Ticket no encontrado");
      }
      const url_base = process.env.EXPO_PUBLIC_API_URL;
      const myheaders = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      };

      const response = await axios.get(`${url_base}/sites/my-sites`, myheaders);
      const listSites = response.data.mysites.list.entries;
      return listSites;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }
);

export const getContainerDocumentLibrary = createAsyncThunk(
  "sites/getDocumentLibrary",
  async (siteName) => {
    try {
      const ticket = await AsyncStorage.getItem("ticket"); // Obtener el ticket desde AsyncStorage
      if (!ticket) {
        throw new Error("Ticket no encontrado"); // Manejar caso donde no haya ticket
      }

      const myheaders = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      };

      const response = await axios.get(
        `${url_base}/sites/document-library/${siteName}`,
        myheaders
      );
      const documentLibrary = await response.data.containerDocumentLibrary.entry
        .id;
      console.log("DL", documentLibrary);
      if (!documentLibrary) {
        return null;
      }
      return documentLibrary;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  }
);

export const createSite = createAsyncThunk("sites/createSite", async (data) => {
  try {
    console.log("data", data);
    const ticket = await AsyncStorage.getItem("ticket"); // Obtener el ticket desde AsyncStorage
    if (!ticket) {
      throw new Error("Ticket no encontrado"); // Manejar caso donde no haya ticket
    }
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    const response = await axios.post(
      `${url_base}/sites/create`,
      data,
      myheaders
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response);
    throw error;
  }
});

export const searchSiteFormTerm = createAsyncThunk(
  "sites/search-sites",
  async ({ ticket, term }) => {
    try {
      const response = await axios.get(
        `${url_base}/queries/searchSites?term=${term}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
          },
        }
      );

      const searchResult = response.data.resultQuery.list.entries;
      console.log("res: ", searchResult);
      return searchResult;
    } catch (error) {
      console.error("Error al buscar un sitio", error);
      return null;
    }
  }
);
export const getSiteActivities = createAsyncThunk(
  "people/get-site-activities",
  async ({ ticket, idSite }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/people//activities-site/${idSite}`,
        myheaders
      );

      const siteActivities = response.data.siteActivities.list.entries;
      return siteActivities;
    } catch (error) {
      console.error("Error al recuperar las actividades", error);
      return null;
    }
  }
);

export const getSiteMembers = createAsyncThunk(
  "sites/get-site-members",
  async ({ ticket, idSite }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/sites/all-members/${idSite}`,
        myheaders
      );

      const siteMembers = response.data.alfrescoSiteMembers.list.entries;
      return siteMembers;
    } catch (error) {
      console.error("Error al recuperar los miembros del sitio", error);
      return null;
    }
  }
);

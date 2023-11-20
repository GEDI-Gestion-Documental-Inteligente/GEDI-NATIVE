import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = process.env.EXPO_PUBLIC_API_URL;

// funcion para obtener los sitios al que pertenece el usuario
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

// funcion para obtener el contenedor de los nodos de un sitio
export const getContainerDocumentLibrary = createAsyncThunk(
  "sites/getDocumentLibrary",
  async ({ticket, siteName}) => {
    try {

      if (!ticket) {
        throw new Error("Ticket no encontrado");
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

// funcion para crear un nuevo sitio
export const createSite = createAsyncThunk("sites/createSite", async ({ticket, siteData}) => {
  console.log(siteData)
  try {
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
      siteData,
      myheaders
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response);
    throw error;
  }
});

// funcion para realizar una busqueda de sitios en base a un termino
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

// funcion para obtener las actividades de un usuario de un sitio
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

// funcion para obtener los miembros de un sitio
export const getSiteMembers = createAsyncThunk(
  "sites/get-site-members",
  async ({ ticket, siteId }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/sites/all-members/${siteId}`,
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

// funcion para crear un miembro dentro de un sitio
export const createSiteMember = createAsyncThunk(
  "sites/create-site-member",
  async ({ ticket, siteId, userData }) => {
    console.log(ticket);
    console.log(siteId);
    console.log(userData);
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.post(
        `${url_base}/sites/create-member/${siteId}`,
        userData,
        myheaders
      );

      const createdSiteMember = response.data.alfrescoSiteMember;
      console.log(createdSiteMember);

      return createdSiteMember;
    } catch (error) {
      console.error("Error al agregar usuario al sitio", error);
      return null;
    }
  }
);

// funcion para manejar el role de un usuario dentro de un cierto sitio
export const updateSiteMemberRole = createAsyncThunk(
  "sites/update-site-member-role",
  async ({ ticket, siteId, personId, newRole }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.put(
        `${url_base}/sites/update-member/${siteId}/${personId}`,
        { role: newRole },
        myheaders
      );

      const updatedSiteMemberRole = response.data.updatedAlfrescoSiteMember;

      console.log(updatedSiteMemberRole);
      return updatedSiteMemberRole;
    } catch (error) {
      console.error("Error al modificar rol del miembro", error);
      return null;
    }
  }
);

// funcion para eliminar un usuario dentro de un sitio
export const deleteSiteMember = createAsyncThunk(
  "sites/delete-site-member",
  async ({ ticket, siteId, personId }) => {
    console.log(siteId)
    console.log(personId)
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.delete(
        `${url_base}/sites/delete-member/${siteId}/${personId}`,
        myheaders
      );

      const deletedSiteMember = response.data.deletedAlfrescoSiteMember;
      console.log(deletedSiteMember);
      return deletedSiteMember;
    } catch (error) {
      console.error("Error al intentar eliminar al miembro", error);
      return null;
    }
  }
);

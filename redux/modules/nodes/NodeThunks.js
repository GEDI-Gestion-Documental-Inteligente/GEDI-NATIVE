import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = process.env.EXPO_PUBLIC_API_URL;

export const getNodes = createAsyncThunk(
  "nodes/getNodes",
  async ({ id, ticket }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/nodes/${id}/childrens`,
        myheaders
      );
      return response.data.nodes.list.entries;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createFolder = createAsyncThunk(
  "nodes/createFolder",
  async({ id, ticket, nodeData }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      }
    }

    try {
      const response = await axios.post(`${url_base}/nodes/${id}/create-folder`, nodeData, myheaders)
      return response.data.alfrescoNodes.entry
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const uploadContent = createAsyncThunk(
  "nodes/uploadContent",
  async({ id, ticket, formData}) => {
    const myheaders = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: ticket,
      }
    }

    try {
      const response = await axios.post(`${url_base}/nodes/${id}/upload-content`, formData, myheaders)
      return response.data.alfrescoContent.entry
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)

export const fetchContentNode = createAsyncThunk(
  "nodes/getContentNode",
  async ({ id, ticket }) => {
    try {
      const response = await axios.get(`${url_base}/nodes/${id}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      const buffer = await response.data.content;
      const blobb = new Blob(buffer);

      // const blob = new Blob([bufferArr]);

      // // Crea una URL local para el Blob
      // const blobUrl = URL.createObjectURL(blob);

      // // Establece la URL del Blob como fuente de la imagen
      // console.log(blobUrl)

      console.log(blobb);
    } catch (error) {
      console.error("Error fetching PDF content:", error);
      return null;
    }
  }
);

export const SearchNodesForTerm = createAsyncThunk(
  "nodes/searchFormTerm",
  async ({ term, root }) => {
    try {
      const ticket = await AsyncStorage.getItem("ticket");
      const response = await axios.get(`${url_base}/queries/searchNodes?term=${term}&root=${root}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });

      const searchResult = response.data.resultQuery.list.entries
      return searchResult
    } catch (error) {
      console.error("Error fetching nodes", error);
      return null;
    }
  }
);

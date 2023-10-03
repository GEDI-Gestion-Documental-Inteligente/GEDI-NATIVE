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

      console.log(blobb)
    } catch (error) {
      console.error("Error fetching PDF content:", error);
      return null;
    }
  }
);

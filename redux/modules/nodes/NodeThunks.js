import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = process.env.EXPO_PUBLIC_API_URL;

export const getNodes = createAsyncThunk(
  "nodes/get-nodes",
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
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createFolder = createAsyncThunk(
  "nodes/create-folder",
  async ({ id, ticket, nodeData }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.post(
        `${url_base}/nodes/${id}/create-folder`,
        nodeData,
        myheaders
      );
      return response.data.alfrescoNodes.entry;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const uploadContent = createAsyncThunk(
  "nodes/upload-content",
  async ({ id, ticket, formData }) => {
    const myheaders = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.post(
        `${url_base}/nodes/${id}/upload-content`,
        formData,
        myheaders
      );
      return response.data.alfrescoContent.entry;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const fetchContentNode = createAsyncThunk(
  "nodes/get-content-node",
  async ({ id, path }, {getState}) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.get(`${url_base}/uploads/${path}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Error fetching PDF content: ${response.statusText}`);
      }

      const file = response.data;
      console.log(file);
      return file;
    } catch (error) {
      console.error("Error fetching PDF content:", error);
      return null;
    }
  }
);

export const getNodeInfo = createAsyncThunk(
  "nodes/get-node-info",
  async (id, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.get(`${url_base}/one-node/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching node info:", error);
      throw error;
    }
  }
);

export const updateNode = createAsyncThunk(
  "nodes/update-node",
  async ({ id, nodeData }, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.put(`${url_base}/update/${id}`, nodeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating node:", error);
      throw error;
    }
  }
);

export const deleteNode = createAsyncThunk(
  "nodes/delete-node",
  async (id, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.delete(`${url_base}/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting node:", error);
      throw error;
    }
  }
);

export const getNodeParents = createAsyncThunk(
  "nodes/get-node-parents",
  async (id, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.get(`${url_base}/${id}/parents`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching node parents:", error);
      throw error;
    }
  }
);

export const updatePermissionsNode = createAsyncThunk(
  "nodes/update-permissions-node",
  async ({ id, nodeData }, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.put(
        `${url_base}/update-permissions/${id}`,
        nodeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating node permissions:", error);
      throw error;
    }
  }
);

export const updateTypeNode = createAsyncThunk(
  "nodes/update-type-node",
  async ({ id, nodeData }, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.put(
        `${url_base}/update-type/${id}`,
        nodeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating node type:", error);
      throw error;
    }
  }
);

export const moveNode = createAsyncThunk(
  "nodes/move-node",
  async ({ id, targetId }, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.post(
        `${url_base}/move-node/${id}`,
        { targetId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error moving node:", error);
      throw error;
    }
  }
);

export const getNodeTypes = createAsyncThunk(
  "nodes/get-node-types",
  async (_, { getState }) => {
    try {
      const ticket = getState().auth.ticket;
      const response = await axios.get(`${url_base}/types`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ticket,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching node types:", error);
      throw error;
    }
  }
);

export const SearchNodesForTerm = createAsyncThunk(
  "nodes/search-form-term",
  async ({ term, root }) => {
    try {
      const ticket = await AsyncStorage.getItem("ticket");
      const response = await axios.get(
        `${url_base}/queries/searchNodes?term=${term}&root=${root}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ticket,
          },
        }
      );

      const searchResult = response.data.resultQuery.list.entries;
      return searchResult;
    } catch (error) {
      console.error("Error fetching nodes", error);
      return null;
    }
  }
);

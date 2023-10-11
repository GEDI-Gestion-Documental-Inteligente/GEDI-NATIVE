import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyActivities = createAsyncThunk(
  "people/getMyActivities",
  async ({ id, ticket }) => {
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(`${url_base}/people/allActivities`, myheaders);

      const activities = response.data.peopleActivities.list.entries;
      return activities.slice(1, 20);
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
);

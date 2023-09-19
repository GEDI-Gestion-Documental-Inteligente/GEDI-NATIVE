import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyActivities = createAsyncThunk('people/getMyActivities', async({id, ticket})=>{
  const url_base = process.env.URL_BASE
    const myheaders = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + ticket
        }
      }

      try {
        const response = await axios.get(`${url_base}/people`, myheaders)

        const activities = response.data.list.entries
        console.log(activities[1].entry)
        return activities.slice(1, 6);
      } catch (error) {
        console.log(error)
        throw Error;
      }
})
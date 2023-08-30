import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPV4_ADDRESS } from "./SitesThunks";

export const getMyActivities = createAsyncThunk('people/getMyActivities', async({id, ticket})=>{
    const myheaders = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + ticket
        }
      }

      try {
        const response = await axios.get(`http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/people/${id}/activities`, myheaders)

        const activities = response.data.list.entries
        console.log(activities[1].entry)
        return activities.slice(1, 6);
      } catch (error) {
        console.log(error)
        throw Error;
      }
})
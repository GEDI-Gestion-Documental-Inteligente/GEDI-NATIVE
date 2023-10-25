import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url_base = process.env.EXPO_PUBLIC_API_URL;

export const getMyActivities = createAsyncThunk(
  "people/getMyActivities",
  async ({ id, ticket }) => {
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/people/allActivities`,
        myheaders
      );

      const activities = response.data.peopleActivities.list.entries;
      console.log(activities[0].entry.activitySummary);
      return activities.slice(1, 20);
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
);

export const getPeople = createAsyncThunk(
  "people/get-people",
  async ({ ticket }) => {
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.get(
        `${url_base}/people/all-people`,
        myheaders
      );

      const people = response.data.people.list.entries;

      return people;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
);

export const createPeople = createAsyncThunk(
  "people/create",
  async ({ ticket, data }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };
    try {
      const response = await axios.post(
        `${url_base}/people/create`,
        data,
        myheaders
      );

      const peopleCreated = response.data.newPerson;
      return peopleCreated;
    } catch (error) {
      console.error("Error fetching people", error);
      return null;
    }
  }
);

export const searchPeopleForTerm = createAsyncThunk(
  "people/search-form-term",
  async ({ term, ticket }) => {
    try {
      const response = await axios.get(
        `${url_base}/queries/searchPeople?term=${term}`,
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
      console.error("Error fetching people", error);
      return null;
    }
  }
);

export const changeStatusPeople = createAsyncThunk(
  "people/change-status",
  async ({ userId, value, ticket }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.put(
        `${url_base}/people/manage-status/${userId}`,
        myheaders,
        {
          enabled: value,
        }
      );

      const changedPeople = response.data
      return searchResult;
    } catch (error) {
      console.error("Error fetching people", error);
      return null;
    }
  }
);

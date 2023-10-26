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
      console.error("Error al crear una persona", error);
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
      console.error("Error al buscar una persona", error);
      return null;
    }
  }
);

export const editInformationPeople = createAsyncThunk(
  "people/edit-information",
  async ({ ticket, data, userId }) => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
    };

    try {
      const response = await axios.put(
        `${url_base}/people/update/${userId}`,

        data,
        myheaders
      );

      const changedInformationPeople = response.data;
      console.log(changedInformationPeople);
      return changedInformationPeople;
    } catch (error) {
      console.error("Error al actualizar la información de la persona", error);
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

        {
          enabled: value,
        },
        myheaders
      );

      const changedPeople = response.data;
      console.log(changedPeople);
      return changedPeople;
    } catch (error) {
      console.error("Error al cambiar el estado de la persona", error);
      return null;
    }
  }
);

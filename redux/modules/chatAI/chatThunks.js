import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk("chat/sendMessage", async ({ticket, text}) => {
  console.log("chat thunk:", text)
  try {
    const url_base = process.env.EXPO_PUBLIC_API_AI;

    const response = await axios.post(url_base, {
      'prompt': `${text}`,
    });

    if (response.data) {
      console.log(response.data);
      return response.data.output;
    } else {
      return "Lo siento, intenta más tarde";
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response);
      return thunkAPI.rejectWithValue(error.response);
    } else if (error.request) {
      console.error("Network Error:", error.request);
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    } else {
      console.error("Error Message:", error.message);
      return thunkAPI.rejectWithValue("An error occurred. Please try again later.");
    }
  }
});

export const clearResponse = createAsyncThunk(
  'chat/clear-response', async(thunkAPI)=>{
    return
  }
)

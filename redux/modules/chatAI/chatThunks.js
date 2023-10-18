import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk("chat/senMessage", async (ticket, msg) => {
  try {
    const url_base = process.env.EXPO_PUBLIC_API_URL;
    const myheaders = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ticket,
      },
      body: JSON.stringify({
        message: msg
      }),
    };

    const response = await axios.post(
      `${url_base}/chat/sendMessage`,
      myheaders
    );

    if (response.data.ok) {
      return response.data.responseMsg;
    } else {
      return "Lo siento, intenta más tarde";
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
});
